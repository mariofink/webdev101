// singleton --- see http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript
var tttoe = {
	buttons: null,
	spielAktionen: 0,
	gewinnKombinationen: [
		//horizontal
		[1,2,3],
		[4,5,6],
		[7,8,9],
		//vertikal
		[1,4,7],
		[2,5,8],
		[3,6,9],
		//diagonal
		[1,5,9],
		[3,5,7]
	],
	spieler: [
		{
			name: "Spieler 1",
			mark: "X"
		},
		{
			name: "Spieler 2",
			mark: "O"
		}
	],
	spielerAmZug: 1,
	getSpielerAmZugData: function() {
		return this.spieler[this.spielerAmZug-1]; // -1 as first array index is 0
	},
	init: function(btns) {
		this.buttons = btns;
		for (var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].removeAttribute("disabled");
			this.buttons[i].addEventListener("click", this.zugMachen, false);
		}
		document.getElementById("spieler").innerHTML = this.getSpielerAmZugData().name;
	},
	zugMachen: function() {
		// "this" ist in diesem Fall der gedrueckte Button
		this.value = tttoe.spielerAmZug;
		this.innerHTML = tttoe.getSpielerAmZugData().mark;
		this.setAttribute("disabled","disabled");
		tttoe.spielAktionen++;
		tttoe.gewonnen(); // auf evtl. Spielgewinn pruefen
		tttoe.spielerWechseln();
	},
	spielerWechseln: function() {
		if (this.spielerAmZug === 1) {
			this.spielerAmZug = 2;
		} else {
			this.spielerAmZug = 1;
		}
		// Die Anzeige des Spielernamens aktualisieren
		document.getElementById("spieler").innerHTML = this.getSpielerAmZugData().name;
	},
	gewonnen: function() {
		var gewinn = null;
		for (var i = 0, len = this.gewinnKombinationen.length; i<len; i++) {
			// jede Gewinnkombination ueberpruefen
			gewinn = true;
			for (var j = 0, len2 = this.gewinnKombinationen[i].length; j<len2; j++) {
				// jeden Button der aktuellen Kombination ueberpruefen
				if (document.getElementById("f" + this.gewinnKombinationen[i][j]).value != this.spielerAmZug) {
					// hat einer der Buttons nicht die Nummer des aktuellen Spielers als Wert -> das Spiel geht weiter
					gewinn = false;
				}
			}
			if (gewinn === true) {
				// hat ein Spieler gewonnen -> Meldung anzeigen und danach die Seite neu laden
				alert(this.getSpielerAmZugData().name + " hat gewonnen!");
				document.location.reload();
				return;
			}
		}
		if (this.spielAktionen == 9) {
			// Nach 9 Zuegen steht es zwangsweise unentschieden
			alert("Unentschieden");
			document.location.reload();
			return;
		}
		return false;
	}
};

window.addEventListener("load", function() {
	tttoe.init(document.getElementsByName("fieldBtn"));
}, false);