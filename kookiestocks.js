let SK = {
    setCookie: (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
    },
    getCookie: (cname) => {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    },
    saveData: {},
    bank: {},
    minigameGoods: {},
    goods: {},
    initializeGoods: {},
    formatPrice: {},
    update: {},
    interval: {},
    container: {},
    drawInterval: {},
    drawLoop: {},
    canvasLastTop: 0,
    canvasLastLeft: 0,
    htmlTemplate: `
<div id="SK-container" style="position:absolute; left:24px;">
    <style>
        #SKTable {
            z-index: 10000;
            display: block;
            position: relative;
            color: #fff;
            background-color: rgba(0,0,0,.5);
            text-shadow: black -1px 0px, black 0px 1px, black 1px 0px, black 0px -1px;
            font-weight: bold;
            padding: 2px;
        }
        #SKTable tr {
            margin-bottom: 1px;
        }
        #SKTable td {
            width: 32;
        }
        #SKTable .SK-bought {
            color: #4bb8f0;
        }
        #SKTable .SK-boughtAt {
            color: #a358ff;
        }
    </style>
    <table id="SKTable">
        <tr id="SK-0" style="opacity:.4">
            <td>CRL</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
        <tr id="SK-1" style="opacity:.4">
            <td>CHC</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
        <tr id="SK-2" style="opacity:.4">
            <td>BTR</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
        <tr id="SK-3" style="opacity:.4">
            <td>SUG</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
        <tr id="SK-4" style="opacity:.4">
            <td>NUT</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
        <tr id="SK-5" style="opacity:.4">
            <td>SLT</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
        <tr id="SK-6" style="opacity:.4">
            <td>VNL</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
        <tr id="SK-7" style="opacity:.4">
            <td>EGG</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
        <tr id="SK-8" style="opacity:.4">
            <td>CNM</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
        <tr id="SK-9" style="opacity:.4">
            <td>CRM</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
        <tr id="SK-10" style="opacity:.4">
            <td>JAM</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
        <tr id="SK-11" style="opacity:.4">
            <td>WCH</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
        <tr id="SK-12" style="opacity:.4">
            <td>HNY</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
        <tr id="SK-13" style="opacity:.4">
            <td>CKI</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
        <tr id="SK-14" style="opacity:.4">
            <td>RCP</td>
            <td class="SK-ba">(<span class="SK-bought">0</span> </td>
            <td>@ <span class="SK-boughtAt">$0.00</span>)</td>
            <td> -&gt; <span class="SK-profit">$0.00</span></td>
        </tr>
    </table>
</div>
`
};

document.getElementById('sectionMiddle')
    .insertAdjacentHTML('beforeend', SK.htmlTemplate);

SK.initializeGoods = () => {
    SK.minigameGoods.map((good, id) => {
        SK.goods[id] = {
            name: good.name,
            bought: 0,
            value: 0,
            formatted: SK.formatPrice(0, false),
            profit: 0,
            formattedProfit: SK.formatPrice(0, true)
        };
    });
};

SK.bank = Game.ObjectsById[5];
SK.minigameGoods = SK.bank.minigame.goodsById;
SK.goods = Array(SK.minigameGoods.length);

// Attach position of div to canvas
// This is done this way because putting this table near the canvas breaks
// the draw loop for some reason
let getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
};

SK.drawLoop = () => {
    if (Game.onMenu != "" || SK.bank.amount == 0 || SK.bank.muted || !SK.bank.onMinigame)
        document.getElementById('SK-container').style.visibility = 'hidden';
    else
        document.getElementById('SK-container').style.visibility = 'visible';

    var canvasRect = getOffset(document.getElementById('bankGraph'));
    if (canvasRect.top == SK.canvasLastTop)
        return;
    
    document.getElementById('SK-container').style.top = canvasRect.top + 'px';
};
SK.drawInterval = setInterval(SK.drawLoop, 10);

SK.formatPrice = (val, colored) => {
    let money = '$' + val.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    let style = colored ? (val >= 0 ? 'color:#73f21e;' : 'color:#f21e3c;') : "";

    return `<span style="${style}">${money}</span>`;
};

SK.update = () => {
    if (SK.bank.amount == 0)
        SK.initializeGoods();

    let table = document.getElementById('SKTable');

    SK.minigameGoods.map((good, id) => {
        let bought = SK.goods[id].bought;
        if (good.stock == 0) {
            SK.goods[id].bought = 0;
            SK.goods[id].formatted = SK.formatPrice(0, false);
        }
        SK.goods[id].profit = (good.val * bought) - (SK.goods[id].value * bought);
        SK.goods[id].formattedProfit = SK.formatPrice(SK.goods[id].profit, true);
        
        let row = table.querySelector(`#SK-${id}`);
        row.style.opacity = bought > 0 ? 1 : .4;
        row.querySelector('.SK-bought').innerHTML = SK.goods[id].bought;
        row.querySelector('.SK-boughtAt').innerHTML = SK.goods[id].formatted;
        row.querySelector('.SK-profit').innerHTML = SK.goods[id].formattedProfit;
    });

    let serialized = btoa(JSON.stringify(SK.goods));
    SK.setCookie('SK_Data', serialized);
}

SK.initializeGoods();

SK.minigameGoods.map((good, id) => {
    let buy = (bought) => {
        SK.goods[id].bought = bought;
        SK.goods[id].value = bought == 0 ? 0 : good.val;
        SK.goods[id].formatted = SK.formatPrice((bought == 0 ? 0 : good.val), false);
        SK.update();
    };

    let buttons = ['1','10','100','Max','-1','-10','-100','-All'];
    buttons.map((b) => {
        let _id = 'bankGood-' + id + '_' + b;
        document.getElementById(_id)
            .addEventListener('click', () => {
                buy(b > good.stock ? b : good.stock);
            });
    });
});

// Load previous numbers
SK.saveData = SK.getCookie('SK_Data');

if (SK.saveData != '')
try {
    SK.goods = JSON.parse(atob(SK.saveData));
} catch {
    console.log("Failed to load SK save data.");
}

SK.interval = setInterval(SK.update, 1000);
