
/**
 * @private
 * @final
 * @constructor
 * @param {!c.PBody} in_bodyA
 * @param {!c.PBody} in_bodyB
 * @param {!number} in_penetration
 * @param {!Float32Array} in_normal
 * @param {!number} in_mixedRestitution
 * @param {!number} in_mixedDynamicFriction
 * @param {!number} in_mixedStaticFriction
 * @param {!Array<!Float32Array>} in_contactArray
 * @return {undefined}
 */
c.PManifold = function(
	in_bodyA, 
	in_bodyB,
	in_penetration,
	in_normal,
	in_mixedRestitution,
	in_mixedDynamicFriction,
	in_mixedStaticFriction,
	in_contactArray
	) {
	this.m_bodyA = in_bodyA;
	this.m_bodyB = in_bodyB;
	this.m_penetration = in_penetration;
	this.m_normal = in_normal;
	this.m_mixedRestitution = in_mixedRestitution;
	this.m_mixedDynamicFriction = in_mixedDynamicFriction;
	this.m_mixedStaticFriction = in_mixedStaticFriction;
	this.m_contactArray = in_contactArray;

	return;
}

/**
 * @nosideefect
 * @param {!c.PBody} in_bodyA
 * @param {!c.PBody} in_bodyB
 * @param {!c.PManifold=} in_manifoldOrUndefined
 * @return {!c.PManifold}
 */
c.PManifold.FactoryInternal = function(in_bodyA, in_bodyB, in_manifoldOrUndefined){
	var manifold = in_manifoldOrUndefined;
	var mixedRestitution = (in_bodyA.m_restitution + in_bodyB.m_restitution) * 0.5;
	var mixedDynamicFriction = (in_bodyA.m_dynamicFriction + in_bodyB.m_dynamicFriction) * 0.5;
	var mixedStaticFriction = (in_bodyA.m_staticFriction + in_bodyB.m_staticFriction) * 0.5;

	if (undefined === manifold){
		manifold = new c.PManifold(
			in_bodyA, 
			in_bodyB,
			0.0,
			c.Vector3.Factory(),
			mixedRestitution,
			mixedDynamicFriction,
			mixedStaticFriction,
			[]
			);
	} else {
		manifold.m_bodyA = in_bodyA;
		manifold.m_bodyA = in_bodyA;
		manifold.m_mixedRestitution = mixedRestitution;
		manifold.m_mixedDynamicFriction = mixedDynamicFriction;
		manifold.m_mixedStaticFriction = mixedStaticFriction;
	}

	return manifold;
}

/**
 * @nosideefect
 * @param {!c.PBody} in_bodyA
 * @param {!c.PBody} in_bodyB
 * @param {!c.PManifold=} in_manifoldOrUndefined
 * @return {c.PManifold}
 */
c.PManifold.Factory = function(in_bodyA, in_bodyB, in_manifoldOrUndefined) {
	if ((true === in_bodyA.m_static) && (true == in_bodyB.m_static)){
		return null;
	}
	return in_bodyA.m_shape.ManifoldDispatch(in_bodyB.m_shape, in_bodyA, in_bodyB, in_manifoldOrUndefined); 
}

/**
 * @nosideefect
 * @this {c.PManifold}
 * @param {!c.PPlane} in_shapeA
 * @param {!c.PPlane} in_shapeB
 * @param {!c.PBody} in_bodyA
 * @param {!c.PBody} in_bodyB
 * @param {!c.PManifold=} in_manifoldOrUndefined
 * @return {c.PManifold}
 */
c.PManifold.FactoryPlanePlane = function(in_shapeA, in_shapeB, in_bodyA, in_bodyB, in_manifoldOrUndefined){
	return null;
}

/**
 * @nosideefect
 * @this {c.PManifold}
 * @param {!c.PPlane} in_shapeA
 * @param {!c.PSphere} in_shapeB
 * @param {!c.PBody} in_bodyA
 * @param {!c.PBody} in_bodyB
 * @param {!c.PManifold=} in_manifoldOrUndefined
 * @return {c.PManifold}
 */
c.PManifold.FactoryPlaneSphere = function(in_shapeA, in_shapeB, in_bodyA, in_bodyB, in_manifoldOrUndefined){
	var n = c.PManifold.FactoryPlaneSphere;
	n.sOffset = c.Vector3.Minus(in_bodyB.m_position, in_bodyA.m_position, n.sOffset);
	var distance = c.Vector3.DotProduct(in_shapeA.m_normal, n.sOffset) - in_shapeB.m_radius;
	if (0.0 < distance){
		return null;
	}

	var manifold = c.PManifold.FactoryInternal(in_bodyA, in_bodyB, in_manifoldOrUndefined);
	manifold.m_normal = c.Vector3.Clone(in_shapeA.m_normal, manifold.m_normal);
	manifold.m_penetration = -distance;
	manifold.m_contactArray.length = 1;

	n.sRadius = c.Vector3.MultiplyNumeric(manifold.m_normal, in_shapeB.m_radius, n.sRadius);
	manifold.m_contactArray[0] = c.Vector3.Minus(in_bodyB.m_position, n.sRadius, manifold.m_contactArray[0]);

	return manifold;
}

/**
 * @nosideefect
 * @this {c.PManifold}
 * @param {!c.PSphere} in_shapeA
 * @param {!c.PPlane} in_shapeB
 * @param {!c.PBody} in_bodyA
 * @param {!c.PBody} in_bodyB
 * @param {!c.PManifold=} in_manifoldOrUndefined
 * @return {c.PManifold}
 */
c.PManifold.FactorySpherePlane = function(in_shapeA, in_shapeB, in_bodyA, in_bodyB, in_manifoldOrUndefined){
	var manifold = c.PManifold.FactoryPlaneSphere(in_shapeB, in_shapeA, in_bodyB, in_bodyA, in_manifoldOrUndefined);
	if (null !== manifold){
		manifold.Reverse();
	}
	return manifold;
}

/**
 * @nosideefect
 * @this {c.PManifold}
 * @param {!c.PSphere} in_shapeA
 * @param {!c.PSphere} in_shapeB
 * @param {!c.PBody} in_bodyA
 * @param {!c.PBody} in_bodyB
 * @param {!c.PManifold=} in_manifoldOrUndefined
 * @return {c.PManifold}
 */
c.PManifold.FactorySphereSphere = function(in_shapeA, in_shapeB, in_bodyA, in_bodyB, in_manifoldOrUndefined){
	var n = c.PManifold.FactorySphereSphere;
	n.sOffset = c.Vector3.Minus(in_bodyB.m_position, in_bodyA.m_position, n.sOffset);
	var distanceSquared = c.Vector3.DotProduct(n.sOffset, n.sOffset);
	var radiusSum = in_shapeA.m_radius + in_shapeB.m_radius

	if (radiusSum * radiusSum < distanceSquared){
		return null;
	}

	var distance = Math.sqrt(distanceSquared);

	var manifold = c.PManifold.FactoryInternal(in_bodyA, in_bodyB, in_manifoldOrUndefined);
	if (0.0 != distance){
		manifold.m_normal = c.Vector3.MultiplyNumeric(n.sOffset, 1.0/distance, manifold.m_normal);
	} else {
		manifold.m_normal = c.Vector3.Clone(c.Vector3.s_unitX, manifold.m_normal);
	}

	manifold.m_penetration = radiusSum - distance;
	manifold.m_contactArray.length = 1;

	n.sRadius = c.Vector3.MultiplyNumeric(manifold.m_normal, in_shapeA.m_radius, n.sRadius);
	manifold.m_contactArray[0] = c.Vector3.Plus(in_bodyA.m_position, n.sRadius, manifold.m_contactArray[0]);

	return manifold;
}

/**
 * @return {undefined}
 */
c.PManifold.prototype.Reverse = function() {
	var temp = this.m_bodyA;
	this.m_bodyA = this.m_bodyB;
	this.m_bodyB = temp;

	this.m_normal = c.Vector3.MultiplyNumeric(this.m_normal, -1.0, this.m_normal);

	return;
}

/**
 * @return {undefined}
 */
c.PManifold.prototype.ApplyImpulse = function() {
	var n = c.PManifold.prototype.ApplyImpulse;
	for (var index = 0, len = this.m_contactArray.length; index < len; index++) {
		var contact = this.m_contactArray[index];

		// Relative velocity
		n.rv = c.Vector3.Minus(this.m_bodyB.m_velocity, this.m_bodyA.m_velocity, n.rv);

		// Relative velocity along the normal
		var contactVel = c.Vector3.DotProduct(n.rv, this.m_normal );

		// Do not resolve if velocities are separating
		if(0.0 < contactVel){
			return;
		}

		// Calculate radii from COM to contact
		n.ra = c.Vector3.Minus(contact, this.m_bodyA.m_position, n.ra);
		n.rb = c.Vector3.Minus(contact, this.m_bodyB.m_position, n.rb);


    real raCrossN = Cross( ra, normal );
    real rbCrossN = Cross( rb, normal );
    real invMassSum = A->im + B->im + Sqr( raCrossN ) * A->iI + Sqr( rbCrossN ) * B->iI;

    // Calculate impulse scalar
    real j = -(1.0f + e) * contactVel;
    j /= invMassSum;
    j /= (real)contact_count;

    // Apply impulse
    Vec2 impulse = normal * j;
    A->ApplyImpulse( -impulse, ra );
    B->ApplyImpulse(  impulse, rb );

    // Friction impulse
    rv = B->velocity + Cross( B->angularVelocity, rb ) -
         A->velocity - Cross( A->angularVelocity, ra );

    Vec2 t = rv - (normal * Dot( rv, normal ));
    t.Normalize( );

    // j tangent magnitude
    real jt = -Dot( rv, t );
    jt /= invMassSum;
    jt /= (real)contact_count;

    // Don't apply tiny friction impulses
    if(Equal( jt, 0.0f ))
      return;

    // Coulumb's law
    Vec2 tangentImpulse;
    if(std::abs( jt ) < j * sf)
      tangentImpulse = t * jt;
    else
      tangentImpulse = t * -j * df;

    // Apply friction impulse
    A->ApplyImpulse( -tangentImpulse, ra );
    B->ApplyImpulse(  tangentImpulse, rb );
  }
}

/**
 * @return {undefined}
 */
c.PManifold.prototype.PositionalCorrection = function() {
	var k_slop = 0.05; // Penetration allowance
	var percent = 0.4; // Penetration percentage to correct
	var correctionFactor = (Math.max(this.m_penetration - k_slop, 0.0f ) / (this.m_bodyA.m_massInvert + this.m_bodyB.m_massInvert)) * percent;
	var n = c.PManifold.prototype.PositionalCorrection;
	n.correctionA = c.Vector3.MultiplyNumeric(this.m_normal, correctionFactor * this.m_bodyA.m_massInvert, n.correctionA);
	n.correctionB = c.Vector3.MultiplyNumeric(this.m_normal, correctionFactor * this.m_bodyB.m_massInvert, n.correctionB);

	this.m_bodyA.m_position = c.Vector.Minus(this.m_bodyA.m_position, n.correctionA, this.m_bodyA.m_position);
	this.m_bodyB.m_position = c.Vector.Plus(this.m_bodyB.m_position, n.correctionA, this.m_bodyB.m_position);

	return;
}

