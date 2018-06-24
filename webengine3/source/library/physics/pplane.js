/**
 * @private
 * @final
 * @constructor
 * @param {!Float32Array} in_normal
 * @return {undefined}
 */
c.PPlane = function(in_normal) {
	this.m_normal = in_normal;

	return;
}
c["PPlane"] = c.PPlane;

/**
 * @nosideefect
 * @param {!Float32Array} in_normal
 * @return {!c.PPlane}
 */
c.PPlane.Factory = function(in_normal) {
	return new c.PPlane(in_normal);
}
c.PPlane["Factory"] = c.PPlane.Factory;

/**
 * @nosideefect
 * @this {c.PPlane}
 * @param {!(c.PSphere|c.PPlane)} in_otherB
 * @param {!c.PBody} in_bodyA
 * @param {!c.PBody} in_bodyB
 * @param {!c.PManifold=} in_manifold
 * @return {c.PManifold}
 */
c.PPlane.prototype.ManifoldDispatch = function(in_otherB, in_bodyA, in_bodyB, in_manifold) {
	return in_otherB.ManifoldPlane(this, in_bodyA, in_bodyB, in_manifold);
}

/**
 * @nosideefect
 * @this {c.PPlane}
 * @param {!c.PPlane} in_otherA
 * @param {!c.PBody} in_bodyA
 * @param {!c.PBody} in_bodyB
 * @param {!c.PManifold=} in_manifold
 * @return {c.PManifold}
 */
c.PPlane.prototype.ManifoldPlane = function(in_otherA, in_bodyA, in_bodyB, in_manifold) {
	return c.PManifold.FactoryPlanePlane(in_otherA, this, in_bodyA, in_bodyB, in_manifold);
}

/**
 * @nosideefect
 * @this {c.PPlane}
 * @param {!c.PSphere} in_otherA
 * @param {!c.PBody} in_bodyA
 * @param {!c.PBody} in_bodyB
 * @param {!c.PManifold=} in_manifold
 * @return {c.PManifold}
 */
c.PPlane.prototype.ManifoldSphere = function(in_otherA, in_bodyA, in_bodyB, in_manifold) {
	return c.PManifold.FactorySpherePlane(in_otherA, this, in_bodyA, in_bodyB, in_manifold);
}
