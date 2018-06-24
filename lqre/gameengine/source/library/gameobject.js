goog.forwardDeclare("c.DagNodeCollection");

/**
 * @private
 * @final
 * @constructor
 * @param {!string} in_type
 * @param {!string} in_id
 * @param {!number} in_writeLock
 * @param {!c.DagNodeCollection} in_dagCollection
 * @return {undefined}
 */
c.GameObject = function (in_type, in_id, in_writeLock, in_dagCollection) {
	this.m_type = in_type;
	this.m_id = in_id;
	this.m_writeLock = in_writeLock;
	this.m_dagCollection = in_dagCollection;

	return;
}
c["GameObject"] = c.GameObject;

/**
 * @nosideefect
 * @param {!string} in_type
 * @param {!string} in_id
 * @param {!number} in_writeLock
 * @param {!c.DagNodeCollection} in_dagCollection
 * @param {!c.GameObject=} in_destObjectOrUndefined
 * @return {!c.GameObject}
 */
c.GameObject.Factory = function(in_type, in_id, in_writeLock, in_dagCollection, in_destObjectOrUndefined) {
	c.Log(LOG, "GameObject.Factory");

	if(in_destObjectOrUndefined !== undefined) {
		in_destObjectOrUndefined.m_type = in_type;
		in_destObjectOrUndefined.m_id = in_id;
		in_destObjectOrUndefined.m_writeLock = in_writeLock;
		in_destObjectOrUndefined.m_dagCollection = in_dagCollection;
		return in_destObjectOrUndefined;
	}
	return new c.GameObject(in_type, in_id, in_writeLock, in_dagCollection);
}
c.GameObject["Factory"] = c.GameObject.Factory;

/**
 * @nosideefect
 * @return {!string}
 */
c.GameObject.prototype.GetType = function() {
	return this.m_type;
}

/**
 * @nosideefect
 * @return {!string}
 */
c.GameObject.prototype.GetID = function() {
	return this.m_id;
}

/**
 * @nosideefect
 * @return {!number}
 */
c.GameObject.prototype.GetWriteLock = function() {
	return this.m_writeLock;
}

/**
 * @nosideefect
 * @param {!string} in_name
 * @return {?}
 */
c.GameObject.prototype.GetValue = function(in_name) {
	return this.m_dagCollection.GetValue(in_name);
}
c.GameObject.prototype["GetValue"] = c.GameObject.prototype.GetValue;

/**
 * @nosideefect
 * @param {!string} in_name
 * @param {?} in_value
 * @return {undefined}
 */
c.GameObject.prototype.SetValue = function(in_name, in_value) {
	this.m_dagCollection.SetValue(in_name, in_value);
	return;
}
c.GameObject.prototype["SetValue"] = c.GameObject.prototype.SetValue;

/**
 * @nosideefect
 * @return {!Array<!string>}
 */
c.GameObject.prototype.GetDirtyArray = function() {
	return this.m_dagCollection.GetDirtyArray();
}
c.GameObject.prototype["GetDirtyArray"] = c.GameObject.prototype.GetDirtyArray;
