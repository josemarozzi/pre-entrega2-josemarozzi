// Objeto para manejar el préstamo
const prestamo = {
    tasaInteresAnual: 0.35, // 35% de interés anual
    monto: 0,
    plazo: 0,
    calcularCuotaMensual: function () {
        const tasaMensual = this.tasaInteresAnual / 12;
        return (this.monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -this.plazo));
    },
};

// Array para almacenar varios préstamos
const prestamosGuardados = [];

// Función para obtener un valor válido
function obtenerValor(promptMensaje, validacionFunc) {
    let valor;
    do {
        valor = validacionFunc(prompt(promptMensaje));
        if (isNaN(valor) || valor <= 0) {
            alert("Por favor, ingrese un valor válido.");
        }
    } while (isNaN(valor) || valor <= 0);
    return valor;
}

// Método de búsqueda y filtrado sobre el array de préstamos
function buscarPrestamosPorMonto(montoBuscado) {
    return prestamosGuardados.filter(prestamo => prestamo.monto === montoBuscado);
}

// Función principal para calcular el préstamo
function calcularPrestamo() {
    prestamo.monto = obtenerValor("¿Cuánto dinero necesita?", parseFloat);
    prestamo.plazo = obtenerValor("¿En cuántos meses planea pagar el préstamo?", parseInt);

    const cuotaMensual = prestamo.calcularCuotaMensual();
    const totalAPagar = cuotaMensual * prestamo.plazo;

    alert(`
        Monto del préstamo: $${prestamo.monto.toFixed(2)}
        Plazo: ${prestamo.plazo} meses
        Cuota mensual: $${cuotaMensual.toFixed(2)}
        Total a pagar: $${totalAPagar.toFixed(2)}
    `);

    // Guardar el préstamo en el array
    prestamosGuardados.push({
        monto: prestamo.monto,
        plazo: prestamo.plazo,
        tasaInteresAnual: prestamo.tasaInteresAnual,
    });
}

// Llama a la función al cargar la página para iniciar el proceso
calcularPrestamo();
