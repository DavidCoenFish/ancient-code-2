/**
 * @private
 * @final
 * @constructor
 * @param {!Float32Array} in_position
 * @param {!boolean} in_static
 * @param {!number} in_mass
 * @param {!number} in_massInvert
 * @param {!number} in_staticFriction
 * @param {!number} in_dynamicFriction
 * @param {!number} in_restitution
 * @param {!(c.PSphere|c.PPlane)} in_shape
 * @return {undefined}
 */
c.PBody = function(
	in_position,
	in_static, 
	in_mass, 
	in_massInvert, 
	in_staticFriction, 
	in_dynamicFriction, 
	in_restitution, 
	in_shape
	) {
	this.m_position = in_position;
	this.m_static = in_static;
	this.m_mass = in_mass;
	this.m_massInvert = in_massInvert;
	this.m_staticFriction = in_staticFriction;
	this.m_dynamicFriction = in_dynamicFriction;
	this.m_restitution = in_restitution;
	this.m_shape = in_shape;

	this.m_velocity = c.Vector3.Factory();
	this.m_force = c.Vector3.Factory();

	return;
}

/**
 * @nosideefect
 * @param {!Float32Array} in_position
 * @param {!number} in_staticFriction
 * @param {!number} in_dynamicFriction
 * @param {!number} in_restitution
 * @param {!(c.PSphere|c.PPlane)} in_shape
 * @return {!c.PBody}
 */
c.PBody.FactoryStatic = function(in_position, in_staticFriction, in_dynamicFriction, in_restitution, in_shape){
	return new c.PBody(in_position, true, 0.0, 0.0, in_staticFriction, in_dynamicFriction, in_restitution, in_shape);
}

/**
 * @nosideefect
 * @param {!Float32Array} in_position
 * @param {!number} in_mass
 * @param {!number} in_staticFriction
 * @param {!number} in_dynamicFriction
 * @param {!number} in_restitution
 * @param {!(c.PSphere|c.PPlane)} in_shape
 * @return {!c.PBody}
 */
c.PBody.FactoryDynamic = function(in_position, in_mass, in_staticFriction, in_dynamicFriction, in_restitution, in_shape){
	return new c.PBody(in_position, false, in_mass, 1.0 / in_mass, in_staticFriction, in_dynamicFriction, in_restitution, in_shape);
}

/**
 * @return {undefined}
 */
c.PBody.prototype.ClearForce = function() {
	c.Vector3.Set(this.m_force, 0.0, 0.0, 0.0);
	return;
}

/**
 * @param {!number} in_timeDelta
 * @return {undefined}
 */
c.PBody.prototype.IntegrateForces = function(in_timeDelta) {
	if(true === this.m_static) {
		return;
	}

	var n = c.PBody.prototype.IntegrateForces;
	n.sVelocityDelta = c.Vector3.MultiplyNumeric(this.m_force, (this.m_massInvert * in_timeDelta * 0.5), n.sVelocityDelta);
	this.m_velocity = c.Vector3.Plus(this.m_velocity, n.sVelocityDelta, this.m_velocity);

	//b->velocity += (b->force * b->im + gravity) * (in_timeDelta / 2.0f);
	//b->angularVelocity += b->torque * b->iI * (in_timeDelta / 2.0f);

	return;
}

/**
 * @param {!number} in_timeDelta
 * @return {undefined}
 */
c.PBody.prototype.IntegrateVelocity = function(in_timeDelta) {
	if(true === this.m_static) {
		return;
	}

	var n = c.PBody.prototype.IntegrateVelocity;
	n.sPositionDelta = c.Vector3.MultiplyNumeric(this.m_velocity, in_timeDelta, n.sPositionDelta);
	this.m_position = c.Vector3.Plus(this.m_position, n.sPositionDelta, this.m_position);

	//b->position += b->velocity * dt;
	//b->orient += b->angularVelocity * dt;
	//b->SetOrient( b->orient );

	this.IntegrateForces(in_timeDelta);
	return;
}
