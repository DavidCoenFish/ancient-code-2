/**
 * @private
 * @final
 * @constructor
 * @return {undefined}
 */
c.PScene = function(in_iterations) {
	this.m_iterations = in_iterations;
	this.m_bodyArray = [];
	this.m_forceArray = [];
	this.m_manifoldArray = [];
	return;
}
c["PScene"] = c.PScene;

/**
 * @nosideefect
 * @return {!c.PScene}
 */
c.PScene.Factory = function(in_iterations) {
	return new c.PScene(in_iterations);
}
c.PScene["Factory"] = c.PScene.Factory;

/**
 * @param {!Float32Array} in_position
 * @param {!number} in_staticFriction
 * @param {!number} in_dynamicFriction
 * @param {!number} in_restitution
 * @param {!(c.PSphere|c.PPlane)} in_shape
 * @return {!c.PBody}
 */
c.PScene.prototype.AddShapeStatic = function(in_position, in_staticFriction, in_dynamicFriction, in_restitution, in_shape) {
	var body = c.PBody.FactoryStatic(in_position, in_staticFriction, in_dynamicFriction, in_restitution, in_shape);
	this.m_bodyArray.push(body);
	return body;
}
c.PScene.prototype['AddShapeStatic'] = c.PScene.prototype.AddShapeStatic;

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
c.PScene.prototype.AddShapeDynamic = function(in_position, in_mass, in_staticFriction, in_dynamicFriction, in_restitution, in_shape) {
	var body = c.PBody.FactoryDynamic(in_position, in_mass, in_staticFriction, in_dynamicFriction, in_restitution, in_shape);
	this.m_bodyArray.push(body);
	return body;
}

/**
 * @nosideefect
 * @param {!number} in_timeDelta
 * @return {undefined}
 */
c.PScene.prototype.Update = function(in_timeDelta) {
	//collect collisions
	var manifoldCount = 0;
	for (var index = 0, len = this.m_bodyArray.length; index < len; index++) {
		var body = this.m_bodyArray[index];
		for (var subIndex = index + 1, subLen = this.m_bodyArray.length; subIndex < subLen; subIndex++) {
			var subBody = this.m_bodyArray[subIndex];
			var manifold = c.PManifold.Factory(body, subBody, this.m_manifoldArray[manifoldCount]);
			if (null === manifold) {
				continue;
			}
			this.m_manifoldArray[manifoldCount] = manifold;
			manifoldCount += 1;
		}
	}

	// Integrate forces
	for (var index = 0, len = this.m_bodyArray.length; index < len; index++) {
		var body = this.m_bodyArray[index];

		//apply forces
		for (var subIndex = index + 1, subLen = this.m_forceArray.length; subIndex < subLen; subIndex++) {
			var force = this.m_forceArray[subIndex];
			force.Apply(body);
		}

		body.IntegrateForces(in_timeDelta);
	}

	// Solve collisions
	for (var index = 0; index < this.m_iterations; index++) {
		for (var subIndex = 0; subIndex < manifoldCount; subIndex++) {
			var manifold = this.m_manifoldArray[subIndex];
			manifold.ApplyImpulse();
		}
	}

	// Integrate velocities
	for (var index = 0, len = this.m_bodyArray.length; index < len; index++) {
		var body = this.m_bodyArray[index];
		body.IntegrateVelocity(in_timeDelta);
	}

	// Correct positions
	for (var index = 0; index < manifoldCount; index++) {
		var manifold = this.m_manifoldArray[index];
		manifold.PositionalCorrection();
	}

	// Clear forces on bodies
	for (var index = 0, len = this.m_bodyArray.length; index < len; index++) {
		var body = this.m_bodyArray[index];
		body.ClearForce();
	}

	return;
}

