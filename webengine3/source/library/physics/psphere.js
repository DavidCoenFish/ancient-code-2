/**
 * @private
 * @final
 * @constructor
 * @param {!number} in_radius
 * @return {undefined}
 */
c.PSphere = function(in_radius) {
	this.m_radius = in_radius;

	return;
}
c["PSphere"] = c.PSphere;

/**
 * @nosideefect
 * @param {!number} in_radius
 * @return {!c.PSphere}
 */
c.PSphere.Factory = function(in_radius) {
	return new c.PSphere(in_radius);
}
c.PSphere["Factory"] = c.PSphere.Factory;

/**
 * @nosideefect
 * @this {c.PSphere}
 * @param {!(c.PSphere|c.PPlane)} in_otherB
 * @param {!c.PBody} in_bodyA
 * @param {!c.PBody} in_bodyB
 * @param {!c.PManifold=} in_manifold
 * @return {c.PManifold}
 */
c.PSphere.prototype.ManifoldDispatch = function(in_otherB, in_bodyA, in_bodyB, in_manifold) {
	return in_otherB.ManifoldSphere(this, in_bodyA, in_bodyB, in_manifold);
}

/**
 * @nosideefect
 * @this {c.PSphere}
 * @param {!c.PPlane} in_otherA
 * @param {!c.PBody} in_bodyA
 * @param {!c.PBody} in_bodyB
 * @param {!c.PManifold=} in_manifold
 * @return {c.PManifold}
 */
c.PSphere.prototype.ManifoldPlane = function(in_otherA, in_bodyA, in_bodyB, in_manifold) {
	return c.PManifold.FactoryPlaneSphere(in_otherA, this, in_bodyA, in_bodyB, in_manifold);
}

/**
 * @nosideefect
 * @this {c.PSphere}
 * @param {!c.PSphere} in_otherA
 * @param {!c.PBody} in_bodyA
 * @param {!c.PBody} in_bodyB
 * @param {!c.PManifold=} in_manifold
 * @return {c.PManifold}
 */
c.PSphere.prototype.ManifoldSphere = function(in_otherA, in_bodyA, in_bodyB, in_manifold) {
	return c.PManifold.FactorySphereSphere(in_otherA, this, in_bodyA, in_bodyB, in_manifold);
}
