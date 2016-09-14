
String.prototype.score = function (word, fuzziness) {
    'use strict';

    // If the string is equal to the word, perfect match.
    if (this === word) { return 1; }

    //if it's not a perfect match and is empty return 0
    if (word === "") { return 0; }

    var runningScore = 0,
        charScore,
        finalScore,
        string = this,
        lString = string.toLowerCase(),
        strLength = string.length,
        lWord = word.toLowerCase(),
        wordLength = word.length,
        idxOf,
        startAt = 0,
        fuzzies = 1,
        fuzzyFactor,
        i;

    // Cache fuzzyFactor for speed increase
    if (fuzziness) { fuzzyFactor = 1 - fuzziness; }

    // Walk through word and add up scores.
    // Code duplication occurs to prevent checking fuzziness inside for loop
    if (fuzziness) {
        for (i = 0; i < wordLength; i += 1) {

            // Find next first case-insensitive match of a character.
            idxOf = lString.indexOf(lWord[i], startAt);

            if (idxOf === -1) {
                fuzzies += fuzzyFactor;
            } else {
                if (startAt === idxOf) {
                    // Consecutive letter & start-of-string Bonus
                    charScore = 0.7;
                } else {
                    charScore = 0.1;

                    // Acronym Bonus
                    // Weighing Logic: Typing the first character of an acronym is as if you
                    // preceded it with two perfect character matches.
                    if (string[idxOf - 1] === ' ') { charScore += 0.8; }
                }

                // Same case bonus.
                if (string[idxOf] === word[i]) { charScore += 0.1; }

                // Update scores and startAt position for next round of indexOf
                runningScore += charScore;
                startAt = idxOf + 1;
            }
        }
    } else {
        for (i = 0; i < wordLength; i += 1) {
            idxOf = lString.indexOf(lWord[i], startAt);
            if (-1 === idxOf) { return 0; }

            if (startAt === idxOf) {
                charScore = 0.7;
            } else {
                charScore = 0.1;
                if (string[idxOf - 1] === ' ') { charScore += 0.8; }
            }
            if (string[idxOf] === word[i]) { charScore += 0.1; }
            runningScore += charScore;
            startAt = idxOf + 1;
        }
    }

    // Reduce penalty for longer strings.
    finalScore = 0.5 * (runningScore / strLength + runningScore / wordLength) / fuzzies;

    if ((lWord[0] === lString[0]) && (finalScore < 0.85)) {
        finalScore += 0.15;
    }

    return finalScore;
};

function pinyinfy(text) {
    return pinyin(text, {
        style: pinyin.STYLE_NORMAL, // 设置拼音风格
        heteronym: true, segment: true
    }).toString()
}

function dedup(results) {
    //result ==> [ { score, obj, key } ]
    var t = [];
    for(var i = 0; i < results.length; i++) {
        //find 
        var o = undefined;
        for(var j = 0; j < t.length; j++){
            if(t[j].key == results[i].key && t[j].obj == results[i].obj) {
                o = t[j];
                break;
            }
        }
        if(o){
            o.score += results[i].score;
        } else {
            t.push(results[i]);
        }
    }
    return t;
}

function search(key, dataSet_s, indexes, threshold) {
    key = key.replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g, "");
    // console.log(key);
    if (key.trim().indexOf(" ") >= 0) {
        key = key.split(" ");
        var set = dataSet_s;
        for (var i = 0; i < key.length; i++) {
            var resultTmp = _search(key[i], set, indexes, threshold);
            if (resultTmp.length == 0) return [];
            if (i + 1 < key.length) {
                set = [];
                for (var j = 0; j < resultTmp.length; j++) {
                    if (!set[resultTmp[j].key]) {
                        set[resultTmp[j].key] = [];
                        set[resultTmp[j].key].__score = [];
                    }
                    set[resultTmp[j].key].push(resultTmp[j].obj);
                    set[resultTmp[j].key].__score.push(resultTmp[j].score);
                }
            }
            else {
                set = resultTmp;
            }
        }
        return set;

    } else {
        return _search(key, dataSet_s, indexes, threshold);
    }
}

function _search(key, dataSet_s, indexes, threshold) {
    //dataset_s -> { key: [ your data set ] }
    //indexes contains { key: { [keys] : scores } }
    threshold = threshold || 0.2;
    var results = [];
    var mkey = pinyinfy(key).replace(/,/g, "");
    key = key.split("+");
    mkey = mkey.split("+");
    for (var k in dataSet_s) {
        // console.log("key", k);
        var j = dataSet_s[k]; //should be array of objects
        if (!indexes[k]) {
            continue;
        }
        var m = indexes[k];
        if (!j.__cache) {
            j.__cache = [];
            for (var t in j) {
                if (t == "__cache") continue;
                var obj = j[t];
                j.__cache[t] = {};
                for (var q in m) {
                    j.__cache[t][q] = obj[q] + pinyinfy(obj[q]);
                }
            }
        }
        j = j.__cache;
        for (var t in j) {
            var sc = 0;
            // console.log(t);
            for (var q in m) {
                // console.log(q, j[t]);
                // console.log(key, mkey, j[t][q], m[q]);
                for (var x = 0; x < key.length; x++) {
                    if (key[x].trim().length == 0 || mkey[x].trim().length == 0) continue;
                    sc += (j[t][q].score(key[x]) * 2 + j[t][q].score(mkey[x]) * 0.5) * m[q];
                }
                // console.log(q, sc);
                
            }
            if (dataSet_s[k].__score && dataSet_s[k].__score[t]) {
                sc = sc * dataSet_s[k].__score[t];
            }
            if (sc >= threshold) {
                results.push({
                    score: sc,
                    key: k,
                    obj: dataSet_s[k][t]
                });
            }
        }
    }
    results.sort(function (a, b) {
        return a.score - b.score;
    });
    return results;
}



function timeDifference(dstart, dend) {
    //2 = ahead
    //1 = within
    //0 = done
    var now = (new Date()).getTime();
    if(now - dend > 0) {
        return 0;
    } else if (now - dstart > 0) {
        return 1;
    } else {
        return 2;
    }
}

function dayhourTotime(day, time, month, year, offset) {
    var h = parseInt(time.split(":")[0].trim());
    var m = parseInt(time.split(":")[1].trim());
    var d = parseInt(day.trim());
    year = year || new Date().getFullYear();
    month = month || new Date().getMonth();
    offset = offset || new Date().getTimezoneOffset();

    return new Date(year, month - 1, d, h, m, 0).getTime();
}


this["search"] = search;
