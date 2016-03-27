module.exports = function(RED) {
    "use strict";
    var path= require('path');

    function AnimatorNode(n) {
        RED.nodes.createNode(this,n);
        var node = this;        
        this.on('input', function(msg) 
        {
            msg.payload = '{"cmd":';
            msg.payload += parseInt(n.command);
            
            msg.payload += ',"uid":';
            msg.payload += Math.floor(Math.random()*100000000);
            
            msg.payload += ',"noc":';
            if( n.notifyOnComplete === false )
            {
                msg.payload += '0';
            }
            else
            {
	            msg.payload += '1';
            }

            msg.payload += ',"rly":';
            if( n.relay === false )
            {
                msg.payload += '0';
            }
            else
            {
	            msg.payload += '1';
	            
	            // TODO: blindly copying the string is a bad idea
	            msg.payload += ',"rn":[';
	            msg.payload += n.relaynodes;
	            msg.payload += ']';

            }

            msg.payload += ',"s":';
            if( n.showv === false )
            {
                msg.payload += '0';
            }
            else
            {
	            msg.payload += '1';
            }
            if( isNumeric(n.index) )
            {
	            msg.payload += ',"idx":';
	            msg.payload += parseInt( n.index);
        	}

            if( isNumeric(n.pattern) )
            {
	            msg.payload += ',"p":';
	            msg.payload += parseInt( n.pattern);
        	}
            if( isNumeric(n.patternLength) )
            {
	            msg.payload += ',"pl":';
	            msg.payload += parseInt( n.patternLength);
        	}
            if( isNumeric(n.duration) )
            {
	            msg.payload += ',"d":';
	            msg.payload += parseInt(n.duration);
            }
            if( isNumeric(n.repeat) )
            {
	            msg.payload += ',"r":';
	            msg.payload += parseInt(n.repeat);
            }
            if( isNumeric(n.direction) )
            {
                msg.payload += ',"dir":';
                msg.payload += parseInt(n.direction);
            }
            if( isNumeric(n.fadeBy) )
            {
	            msg.payload += ',"fb":';
	            msg.payload += parseInt(n.fadeBy);
            }
            if( isNumeric(n.probability) )
            {
                msg.payload += ',"pwin":';
                msg.payload += parseInt(n.probability);
            }
            msg.payload += ',"ca":';
            if( n.clearAfter === false )
            {
                msg.payload += '0';
            }
            else
            {
	            msg.payload += '1';
            }
            msg.payload += ',"ce":';
            if( n.clearEnd === false )
            {
                msg.payload += '0';
            }
            else
            {
	            msg.payload += '1';
            }
            if( isNumeric(n.onColor) )
            {
	            msg.payload += ',"onc":';
	            msg.payload += parseInt(n.onColor);
            }
            if( isNumeric(n.offColor) )
            {
	            msg.payload += ',"offc":';
	            msg.payload += parseInt(n.offColor);
            }
            if( isNumeric(n.onTime) )
            {
	            msg.payload += ',"ont":';
	            msg.payload += parseInt(n.onTime);
            }
            if( isNumeric(n.offTime) )
            {
	            msg.payload += ',"offt":';
	            msg.payload += parseInt(n.offTime);
            }
            if( isNumeric(n.bounceTime) )
            {
	            msg.payload += ',"bt":';
	            msg.payload += parseInt(n.bounceTime);
            }
            if( isNumeric(n.fadeTime) )
            {
	            msg.payload += ',"ft":';
	            msg.payload += parseInt(n.fadeTime);
            }
            if( isNumeric(n.fadeIncrement) )
            {
	            msg.payload += ',"fi":';
	            msg.payload += parseInt(n.fadeIncrement);
            }
            if( isNumeric(n.fps) )
            {
	            msg.payload += ',"fps":';
	            msg.payload += parseInt(n.fps);
            }
            if( isNumeric(n.hueUpdateTime) )
            {
	            msg.payload += ',"udtime":';
	            msg.payload += parseInt(n.hueUpdateTime);
            }
            if( isNumeric(n.intensity) )
            {
	            msg.payload += ',"i":';
	            msg.payload += parseInt(n.intensity);
            }
            
            // body complete
            msg.payload += '}';
            node.send(msg);
        });
    }
    RED.nodes.registerType("led-animator",AnimatorNode);

    function isNumeric(val) {
        return !isNaN(+val) && isFinite(val);
    }
};


