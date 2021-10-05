var row, col, idblank;
var table = document.getElementById('gameboard');
var game = [];
var gamecache = [];

function start() {

    var x;

    document.getElementById('contain').style.display = 'block';
    document.getElementById('status').style.display = 'none';

    var output = '';
    
    row = document.getElementById('row').value;
    col = document.getElementById('col').value;

    if (row > 15) row=15;
    if (col > 15) col=15;

    document.getElementById('row').value = row;
    document.getElementById('col').value = col;

    x = 0;
    for (r=0;r<row;r++) {
        output += "<tr>";
        for (c=0;c<col;c++) {
            id = x;
            output += "<td><input type='text' class='txtbox' id='"+id+"' onClick='this.setSelectionRange(0,this.value.length)'></td>";
            x++;
        }
        output += "</tr>";
    }

    table.innerHTML = output;

    var el = document.querySelectorAll('.txtbox');
    var fs = 50-(row*2.5);
    
    for (var i=0;i<el.length;i++) {
        el[i].style.fontSize = fs;
    }

    
}
start();
function check() {
    createarr();
    checkfirst();
    if (ketqua) {
        alert("Dữ liệu bị trùng hoặc sai, vui lòng nhập lại");
    } else {
        checkarr();
        showresult();
        document.getElementById('status').focus();
    }
}

function showresult() {
    
    document.getElementById('status').style.display = 'block';

    

    var output = '';
    output += "<tr><td class='tdtitle tdresult'></td><td class='tdrs tdresult'></td></tr>";
    output += "<tr class='trspace'><td class='tdtitle' style='height: 30px'></td><td class='tdrs' style='height: 30px'></td></tr>";
    output += "<tr><td class='tdtitle'>Kích thướt ô:</td><td class='tdrs'>"+row+" x "+col+"</td></tr>";
    output += "<tr><td class='tdtitle'>Vị trí ô trống ở hàng (từ dưới lên):</td><td class='tdrs'>"+idblank + " ("+ convert(pb) + ")</td></tr>";
    
    output += "<tr><td class='tdtitle'>Tổng số nghịch đảo</td><td class='tdrs'>";
    output += count + " ("+ convert(cb) + ")</td></tr>";
    output += "<tr class='tdnone'><td class='tdnone'></td><td class='tdnone'></td></tr>";
    output += "<tr><td class='tdtitle tdresult'>Kết quả:</td><td class='tdrs tdresult'>";
    output += issolved + "</td></tr>";

    var tblstatus = document.getElementById('tblstatus');
    tblstatus.innerHTML = output;
}

function createarr() {
    var x;
    x=0;
    for (r = 0; r<row; r++) {
        game[r] = [];
        for (c=0;c<col;c++) {

            id = x;

            var Num = document.getElementById(id).value;
            if (Num==0 || Num == '') {
                idblank = row-r;
                Num = '0';
            }

            game[r][c] = Num;
            gamecache[id] = Num;

            x++;

        }
    }
    
}
var ketqua;
function checkfirst() {
    var c = 0;
    for (i=0;i<gamecache.length;i++) {
        for (j=i+1;j<gamecache.length;j++) {
            
            

            if (gamecache[i]==gamecache[j]) {
                ketqua=true;
                break;
            } else {
                ketqua = false;
            }

        }
        if (gamecache[i] != 0) c++;
        if (ketqua) {
            break;
        }
    }
    
    if (c==gamecache.length) ketqua=true;
    return ketqua;
}


let pb,cb,count,issolved;
function checkarr() {
    

    

    let arrtemp = [];
    
    count = 0;
    let cx = 0;

    // Check Idblank is even or Odd
    if (idblank%2==0) {
        pb = true; // Even
    } else {
        pb = false; // Odd
    }
    
    
    for (r=0;r<row;r++) {
        for (c=0;c<col;c++) {
            
            vl = game[r][c];
        

            for (j=1;j<vl;j++) {

                if (arrtemp[0]==undefined) {
                    z=0;
                }

                for (k=0;k<arrtemp.length;k++) {
                    if (j==arrtemp[k]) {
                        z = 1;
                        break;
                    } else {
                        z = 0;
                    }
                }

                if (z==0) cx++;
            }

            count += cx;
            arrtemp.push(vl);
            
            cx = 0;
        }
    }

    if (count%2==0) {
        cb = true;  // Chẵn
    } else {
        cb = false; // Lẻ
    }
       
    if (row%2==1) {
        if (count%2==1) {
            issolved = 'Không giải được';
            
        } else {
            issolved = 'Giải được';
            
        }
    }

    if (row%2 ==0) {
        
        // Blank odd + inversion even -> solved
        // Blank even + inversion odd -> solved
        // Blank odd + inversion odd -> not solved
        // Blank even + inversion even -> not solved
        // Use XOR
        // 0 0 -> 0   1 1 -> 0       0 1 -> 1        1 0 -> 1
        if (pb^cb) {
            issolved = 'Giải được';
            
        } else {
            issolved = 'Không giải được';
            
        }
    }
    
}

function convert(result) {
    if (result) {
        giatri = 'Chẵn';
    } else {
        giatri = 'Lẻ'
    }
    return giatri;
}