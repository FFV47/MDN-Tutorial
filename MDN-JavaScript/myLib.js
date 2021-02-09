// random int from 0 to number included
function random(number) {
	return Math.floor(Math.random() * number + 1);
}

function randi(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function degToRad(degrees) {
	return (degrees * Math.PI) / 180;
}
/** ES2015+ -- ultra-fast
@param n <Number> what to pad left with
@param z <Number> (zeros :) ) width which pad to
@param s <String> (sign :) ) char to pad with, of course may be some like that 'oO'
@return <String>
@example
	pad(7, 15, 'oO')
	// ==> "oOoOoOoOoOoOoO7"

	pad(-1005007, 20)
	// ==> "-00000000000001005007"
*/
function pad(n, z, s) {
	var z = z || 2,
		s = s || "0";
	return (n + "").length <= z
		? ["", "-"][+(n < 0)] + (s.repeat(z) + Math.abs(n)).slice(-1 * z)
		: n + "";
}

function isEmpty(obj) {
	for (var x in obj) {
		return false;
	}
	return true;
}
