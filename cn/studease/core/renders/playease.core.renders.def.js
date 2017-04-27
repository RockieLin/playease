﻿(function(playease) {
	var utils = playease.utils,
		events = playease.events,
		core = playease.core,
		renders = core.renders,
		rendermodes = renders.modes,
		css = utils.css;
	
	renders.def = function(view, config) {
		var _this = utils.extend(this, new events.eventdispatcher('renders.def')),
			_defaults = {},
			_video,
			_currentSrc;
		
		function _init() {
			_this.name = rendermodes.DEFAULT;
			
			_this.config = utils.extend({}, _defaults, config);
			
			_video = utils.createElement('video');
			_video.playsinline = _video['webkit-playsinline'] = _this.config.playsinline;
			_video.poster = _this.config.poster;
			
			_video.addEventListener('durationchange', _onDurationChange);
			_video.addEventListener('ended', _onEnded);
			_video.addEventListener('error', _onError);
		}
		
		_this.setup = function() {
			_this.dispatchEvent(events.PLAYEASE_READY, { id: _this.config.id });
		};
		
		_this.play = function(url) {
			if (_video.src !== _currentSrc || url && url != _this.config.url) {
				if (url && url != _this.config.url) {
					_this.config.url = url;
				}
				
				_video.src = _this.config.url;
				_video.load();
				
				_currentSrc = _video.src
			}
			
			_video.play();
		};
		
		_this.pause = function() {
			_video.pause();
		};
		
		_this.reload = function() {
			_video.load();
		};
		
		_this.seek = function(offset) {
			if (_video.duration === NaN) {
				_this.play();
			} else {
				_video.currentTime = offset * _video.duration / 100;
			}
		};
		
		_this.stop = function() {
			_video.pause();
			_video.src = _currentSrc = undefined;
		};
		
		_this.mute = function(muted) {
			_video.muted = muted;
		};
		
		_this.volume = function(vol) {
			_video.volume = vol / 100;
		};
		
		_this.hd = function(index) {
			
		};
		
		function _onDurationChange(e) {
			_this.dispatchEvent(events.PLAYEASE_DURATION, { duration: e.target.duration });
		}
		
		function _onEnded(e) {
			_this.dispatchEvent(events.PLAYEASE_VIEW_STOP);
		}
		
		function _onError(e) {
			_this.dispatchEvent(events.PLAYEASE_RENDER_ERROR);
		}
		
		_this.element = function() {
			return _video;
		};
		
		_this.resize = function(width, height) {
			
		};
		
		_this.destroy = function() {
			
		};
		
		_init();
	};
})(playease);
