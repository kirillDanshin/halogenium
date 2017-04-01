var React = require('react');
var assign = require('domkit/appendVendorPrefix');
var insertKeyframesRule = require('domkit/insertKeyframesRule');

/**
 * @type {Object}
 */
var keyframes = {
    '50%': {
        transform: 'scale(0.75)',
        opacity: 0.2
    },
    '100%': {
        transform: 'scale(1)',
        opacity: 1
    }
};

var animationName = insertKeyframesRule(keyframes);

var Loader = React.createClass({
    /**
     * @type {Object}
     */
    propTypes: {
        loading: React.PropTypes.bool,
        color: React.PropTypes.string,
        size: React.PropTypes.string,
        margin: React.PropTypes.string
    },

    /**
     * @return {Object}
     */
    getDefaultProps: function() {
        return {
            loading: true,
            color: '#ffffff',
            size: '15px',
            margin: '2px'
        };
    },

    /**
     * @return {Object}
     */
    getBallStyle: function() {
        return {
            backgroundColor: this.props.color,
            width: this.props.size,
            height: this.props.size,
            margin: this.props.margin,
            borderRadius: '100%',
            verticalAlign: this.props.verticalAlign
        }
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getAnimationStyle: function(i) {
        var animation = [animationName, '0.7s', i%2? '0s': '0.35s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'both';

        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    },

    /**
     * @param  {Number} i
     * @return {Object}
     */
    getStyle: function(i) {
        return assign(
            this.getBallStyle(i),
            this.getAnimationStyle(i),
            {
                display: 'inline-block',
				border: '0px solid transparent' // fix firefox/chrome/opera rendering
            }
        )
    },

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    renderLoader: function(loading) {
        if (loading) {
            return (
                <div id={this.props.id} className={this.props.className}>
                    <div style={this.getStyle(1)}></div>
                    <div style={this.getStyle(2)}></div>
                    <div style={this.getStyle(3)}></div>
                </div>
            );
        }

        return null;
    },

    render: function() {
        return this.renderLoader(this.props.loading);
    }
});

module.exports = Loader;
