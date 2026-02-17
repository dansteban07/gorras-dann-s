function formatoCOP(valor) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
    }).format(valor);
}

/* CONVERSIÓN DE TASAS */
function convertirTasa() {
    let nominal = parseFloat(document.getElementById("tasaNominal").value) / 100;
    let m = parseInt(document.getElementById("periodos").value);

    let efectiva = Math.pow(1 + nominal/m, m) - 1;

    document.getElementById("resultadoTasa").innerHTML =
        "Tasa Efectiva Anual: " + (efectiva*100).toFixed(2) + "%";
}

/* VALOR FUTURO */
function calcularVF() {
    let vp = parseFloat(document.getElementById("vp").value);
    let i = parseFloat(document.getElementById("tasa").value) / 100;
    let n = parseInt(document.getElementById("n").value);

    let vf = vp * Math.pow(1 + i, n);

    document.getElementById("resultadoVF").innerHTML =
        "Valor Futuro: " + formatoCOP(vf);
}

/* DIAGRAMA ECONÓMICO */
function dibujarDiagrama() {
    let canvas = document.getElementById("diagrama");
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(550, 100);
    ctx.stroke();

    for(let i=0; i<=5; i++){
        ctx.moveTo(100*i+50, 90);
        ctx.lineTo(100*i+50, 110);
        ctx.stroke();
        ctx.fillText(i, 100*i+45, 130);
    }
}

/* AMORTIZACIÓN CUOTA CONSTANTE */
function amortizacionConstante() {
    let P = parseFloat(document.getElementById("prestamo").value);
    let i = parseFloat(document.getElementById("tasaAmort").value)/100;
    let n = parseInt(document.getElementById("periodosAmort").value);

    let cuota = P * (i*Math.pow(1+i,n)) / (Math.pow(1+i,n)-1);
    let saldo = P;

    let tabla = "<table><tr><th>Periodo</th><th>Cuota</th><th>Interés</th><th>Amortización</th><th>Saldo</th></tr>";

    for(let k=1;k<=n;k++){
        let interes = saldo*i;
        let amort = cuota - interes;
        saldo -= amort;

        tabla += `<tr>
            <td>${k}</td>
            <td>${formatoCOP(cuota)}</td>
            <td>${formatoCOP(interes)}</td>
            <td>${formatoCOP(amort)}</td>
            <td>${formatoCOP(saldo>0?saldo:0)}</td>
        </tr>`;
    }

    tabla += "</table>";
    document.getElementById("tablaAmort").innerHTML = tabla;
}

/* AMORTIZACIÓN CUOTA DECRECIENTE */
function amortizacionDecreciente() {
    let P = parseFloat(document.getElementById("prestamo").value);
    let i = parseFloat(document.getElementById("tasaAmort").value)/100;
    let n = parseInt(document.getElementById("periodosAmort").value);

    let amortConst = P/n;
    let saldo = P;

    let tabla = "<table><tr><th>Periodo</th><th>Cuota</th><th>Interés</th><th>Amortización</th><th>Saldo</th></tr>";

    for(let k=1;k<=n;k++){
        let interes = saldo*i;
        let cuota = amortConst + interes;
        saldo -= amortConst;

        tabla += `<tr>
            <td>${k}</td>
            <td>${formatoCOP(cuota)}</td>
            <td>${formatoCOP(interes)}</td>
            <td>${formatoCOP(amortConst)}</td>
            <td>${formatoCOP(saldo>0?saldo:0)}</td>
        </tr>`;
    }

    tabla += "</table>";
    document.getElementById("tablaAmort").innerHTML = tabla;
}
