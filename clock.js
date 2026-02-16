/**
 * RELÓGIO DIGITAL DE LUXO - FT.GRAFIIA
 * Sincronizado com o sistema do usuário (PC/Celular)
 * Atualização a cada segundo com animação suave
 */

(function() {
    var hoursEl = document.getElementById('clockHours');
    var minutesEl = document.getElementById('clockMinutes');
    var secondsEl = document.getElementById('clockSeconds');
    var dateEl = document.getElementById('clockDate');

    var diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
    var meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

    function pad(n) {
        return n < 10 ? '0' + n : '' + n;
    }

    function updateClock() {
        var now = new Date();

        var h = pad(now.getHours());
        var m = pad(now.getMinutes());
        var s = pad(now.getSeconds());

        if (hoursEl) hoursEl.textContent = h;
        if (minutesEl) minutesEl.textContent = m;
        if (secondsEl) secondsEl.textContent = s;

        if (dateEl) {
            var dia = diasSemana[now.getDay()];
            var num = now.getDate();
            var mes = meses[now.getMonth()];
            dateEl.textContent = dia + ', ' + num + ' ' + mes;
        }
    }

    // Atualizar imediatamente
    updateClock();

    // Atualizar a cada segundo
    setInterval(updateClock, 1000);
})();
