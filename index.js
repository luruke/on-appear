var OnAppear = function(el, opts) {
  this.el = el;
  this.vars = this.extend({
    delay: 0, // ms of delay for the callback
    offset: 0, // px of offset
    callback: function(){}
  }, opts);

  this._done = false;
  this.bind();
  this.check();
};

OnAppear.prototype.extend = function(obj, props) {
  var newObj = Object.create(obj);

  for(var prop in props) {
    if(props.hasOwnProperty(prop)) {
      newObj[prop] = props[prop];
    }
  }

  return newObj;
};

OnAppear.prototype.bind = function() {
  this.checkFn = this.check.bind(this);
  window.addEventListener('scroll', this.checkFn);
};

OnAppear.prototype.destroy = function() {
  this._done = true;
  window.removeEventListener('scroll', this.checkFn);
};

OnAppear.prototype.isInViewport = function() {
  var rect = this.el.getBoundingClientRect();
  return rect.top + rect.height > 0 && (rect.top - this.vars.offset) < window.innerHeight;
};

OnAppear.prototype.check = function() {
  if (this._done || !this.isInViewport()) {
    return;
  }

  this.destroy();
  window.setTimeout(this.vars.callback.bind(this), this.vars.delay);
};

module.exports = OnAppear;
