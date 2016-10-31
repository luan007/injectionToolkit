fs = require('fs');
var q = fs.readdirSync("investors");
var t = "";
for (var i = 0; i < q.length; i++) {
    console.log(q[i]);
    var j = q[i].replace(/ /g, "");
    var cmd = `move C:\\Users\\Mike Luan\\Desktop\\injection_toolkit\\techcrunch\\assets\\Investors\\${q[i]} C:\\Users\\Mike Luan\\Desktop\\injection_toolkit\\techcrunch\\assets\\Investors\\${j}`;
    t += cmd + "\n";
}

fs.writeFileSync("out.bat", t);