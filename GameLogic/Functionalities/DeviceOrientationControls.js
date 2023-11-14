/**
 * W3C Device Orientation control (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
 */

THREE.DeviceOrientationControls = function ( player ) {
	var scope = this;

	this.player = player;
	this.player.object.rotation.reorder( 'YXZ' );

	this.enabled = true;

	this.device = null;
	this.deviceOrientation = {};
	this.screenOrientation = 0;

	this.alphaOffset = 0; // radians

	var onDeviceOrientationChangeEvent = function ( event ) {
		scope.deviceOrientation = event;
	};

	var onScreenOrientationChangeEvent = function () {
		scope.screenOrientation = window.orientation || 0;
	};

	// The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

	var setObjectQuaternion = function () {

		var zee = new THREE.Vector3( 0, 0, 1 );

		var euler = new THREE.Euler();

		var q0 = new THREE.Quaternion();

		var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

		return function ( quaternion, alpha, beta, gamma, orient ) {
			
			euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

			quaternion.setFromEuler( euler ); // orient the this.device

			quaternion.multiply( q1 ); // camera looks out the back of the this.device, not the top

			quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation

		};

	}();

	this.connect = function () {

		onScreenOrientationChangeEvent(); // run once on load

		// iOS 13+

		if ( window.DeviceOrientationEvent !== undefined && typeof window.DeviceOrientationEvent.requestPermission === 'function' ) {

			window.DeviceOrientationEvent.requestPermission().then( function ( response ) {

				if ( response == 'granted' ) {

					window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
					window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

				}

			} ).catch( function ( error ) {
				console.error( 'THREE.DeviceOrientationControls: Unable to use DeviceOrientation API:', error );

			} );

		} else {

			window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
			window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

		}

		scope.enabled = true;

	};

	this.disconnect = function () {

		window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

		scope.enabled = false;

	};

	this.update = function () {

		if ( scope.enabled === false ) return;

		scope.device = scope.deviceOrientation;

		if ( scope.device ) {

			var alpha = scope.device.alpha ? THREE.MathUtils.degToRad( scope.device.alpha ) + scope.alphaOffset : 0; // Z

			var beta = scope.device.beta ? THREE.MathUtils.degToRad( scope.device.beta ) : 0; // X'

			var gamma = scope.device.gamma ? THREE.MathUtils.degToRad( scope.device.gamma ) : 0; // Y''

			var orient = scope.screenOrientation ? THREE.MathUtils.degToRad( scope.screenOrientation ) : 0; // O

			scope.player.angles.phi = beta;

			scope.player.angles.theta = alpha;
			
			setObjectQuaternion( scope.player.object.quaternion, alpha, beta, gamma, orient );

		}
	};

	this.dispose = function () {

		scope.disconnect();

	};

	this.connect();

};