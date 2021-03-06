//@flow
import React, { Component } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import getGLReactImplementation from "../../gl-react-implementation";
const { Surface } = getGLReactImplementation();
import colorScales from "./colorScales";
export { colorScales };

const shaders = Shaders.create({
  colorify: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D children, colorScale;
float greyscale (vec3 c) { return 0.2125 * c.r + 0.7154 * c.g + 0.0721 * c.b; }
void main() {
  vec4 original = texture2D(children, uv);
  vec4 newcolor = texture2D(colorScale, vec2(greyscale(original.rgb), 0.5));
  gl_FragColor = vec4(newcolor.rgb, original.a * newcolor.a);
}`,
  },
});

export const Colorify = ({ children, colorScale, interpolation }) => (
  <Node
    shader={shaders.colorify}
    uniformsOptions={{ colorScale: { interpolation } }}
    uniforms={{ colorScale, children }}
  />
);

export default class Example extends Component {
  render() {
    const { interpolation, color, width } = this.props;
    return (
      <Surface style={{ width, height: width * 300 / 400 }}>
        <Colorify colorScale={colorScales[color]} interpolation={interpolation}>
          {{ uri: "https://i.imgur.com/iPKTONG.jpg" }}
        </Colorify>
      </Surface>
    );
  }
  static defaultProps = {
    interpolation: "linear",
    color: Object.keys(colorScales)[0],
  };
}
