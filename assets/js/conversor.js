(function(exports) {
  "use strict";
  var XRegExp = require('xregexp');

  function Medida(valor,tipo)
  {
    var _valor;
    var _tipo;
    var valortipo = XRegExp('(?<valor>  [0-9]+ ) -?  # valor  \n' +
               '(?<tipo> [a-z]+ ) -?  # tipo  ', 'ix');
    if(isNaN(valor)){
    var valmatch = XRegExp.exec(valor, valortipo);
    _valor = valmatch.valor;
    _tipo = valmatch.tipo;
    }
    return {
      valor: function()           { return _valor; },
      tipo:  function()           { return _tipo; }
    };
  }

  function Temperatura(valor,tipo)
  {
    Medida.call(this, valor, tipo)
  }

  function Celsius(valor)
  {
    Temperatura.call(this,valor,'C')
  }

  function Farenheit(valor)
  {
    Temperatura.call(this, valor, 'F')
  }

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i;
    valor     = valor.match(regexp);

    if (valor) {
      var numero = valor[1],
          tipo   = valor[2].toLowerCase();

      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          break;

        default:
          /* rellene este código */
      }
    }
    else
      elemento.innerHTML = "";
  };
})(this);
