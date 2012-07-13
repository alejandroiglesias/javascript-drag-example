(function(){

  var container;
  var containerId;
  var handle;

  
  // Create elements
  containerId = 'muzzarela-' + Math.floor(Math.random() * 1000);
  document.write('<div id="' + containerId + '" style="width:200px; height:100px; background-color:gray; border:1px solid black; position:relative;"></div>');
  container = document.getElementById(containerId);
  handle = document.createElement('div');
  handle.innerHTML = ' \
  	<div id="handle" style="width:40px; height:40px; background-color:blue; border-radius:30px; position:absolute; bottom:10px; left:80px;"></div> \
  ';
  container.appendChild(handle);

  
  // Add mousedown event listener
  handle.addEventListener('mousedown', function (event) {
  	event.preventDefault();
    this._startY = event.pageY;
    this._startHeight = parseInt(this.offsetHeight);

    // Attach to document so mouse doesn't have to stay precisely on the 'handle'.
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  
  // Define other event listeners
  var mouseMoveHandler = function (event) {
      event.preventDefault();
      var newHeight = handle._startHeight + (event.pageY );
      container.style.height = newHeight + 'px';
  }
  var mouseUpHandler = function (event) {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
  }

})();


// addEventListener polyfill
if (!Element.prototype.addEventListener) {  
  var oListeners = {};  
  function runListeners(oEvent) {  
    if (!oEvent) { oEvent = window.event; }  
    for (var iLstId = 0, iElId = 0, oEvtListeners = oListeners[oEvent.type]; iElId < oEvtListeners.aEls.length; iElId++) {  
      if (oEvtListeners.aEls[iElId] === this) {  
        for (iLstId; iLstId < oEvtListeners.aEvts[iElId].length; iLstId++) { oEvtListeners.aEvts[iElId][iLstId].call(this, oEvent); }  
        break;  
      }  
    }  
  }  
  Element.prototype.addEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {  
    if (oListeners.hasOwnProperty(sEventType)) {  
      var oEvtListeners = oListeners[sEventType];  
      for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {  
        if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }  
      }  
      if (nElIdx === -1) {  
        oEvtListeners.aEls.push(this);  
        oEvtListeners.aEvts.push([fListener]);  
        this["on" + sEventType] = runListeners;  
      } else {  
        var aElListeners = oEvtListeners.aEvts[nElIdx];  
        if (this["on" + sEventType] !== runListeners) {  
          aElListeners.splice(0);  
          this["on" + sEventType] = runListeners;  
        }  
        for (var iLstId = 0; iLstId < aElListeners.length; iLstId++) {  
          if (aElListeners[iLstId] === fListener) { return; }  
        }       
        aElListeners.push(fListener);  
      }  
    } else {  
      oListeners[sEventType] = { aEls: [this], aEvts: [ [fListener] ] };  
      this["on" + sEventType] = runListeners;  
    }  
  };  
  Element.prototype.removeEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {  
    if (!oListeners.hasOwnProperty(sEventType)) { return; }  
    var oEvtListeners = oListeners[sEventType];  
    for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {  
      if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }  
    }  
    if (nElIdx === -1) { return; }  
    for (var iLstId = 0, aElListeners = oEvtListeners.aEvts[nElIdx]; iLstId < aElListeners.length; iLstId++) {  
      if (aElListeners[iLstId] === fListener) { aElListeners.splice(iLstId, 1); }  
    }  
  };  
}