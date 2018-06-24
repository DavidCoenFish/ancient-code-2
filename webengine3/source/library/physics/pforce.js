/**
 * @private
 * @final
 * @constructor
 * @param {!c.DagNodeCalculate} in_dagVector3
 * @return {undefined}
 */
c.PForce = function(in_dagVector3) {
	this.m_dagVector3 = in_dagVector3;

	return;
}
c["PForce"] = c.PForce;

/**
 * @nosideefect
 * @param {!c.DagNodeCalculate} in_dagVector3
 * @return {!c.PForce}
 */
c.PForce.Factory = function(in_dagVector3) {
	return new c.PForce(in_dagVector3);
}
c.PForce["Factory"] = c.PForce.Factory;

/**
 * @nosideefect
 * @this {c.PForce}
 * @param {!c.PBody} in_body
 * @return {undefined}
 */
c.PForce.prototype.Apply = function(in_body) {
	var force = /** @type {!Float32Array} */ (this.m_dagVector3.GetValue());
	in_body.m_force = c.Vector3.Plus(in_body.m_force, force, in_body.m_force);
	return;
}
