#version 130

void dlinesegment(in vec2 x, in vec2 p1, in vec2 p2, out float d);
void dpolygon(in vec2 x, in float N, out float d);

const int npts = 208;
const float path[npts] = float[npts](-0.500,0.145,-0.500,-0.029,-0.500,-0.029,-0.353,-0.029,-0.353,-0.029,-0.353,-0.087,-0.353,-0.087,-0.500,-0.087,-0.500,-0.087,-0.500,-0.145,-0.500,-0.145,-0.280,-0.145,-0.280,-0.145,-0.280,0.029,-0.280,0.029,-0.427,0.029,-0.427,0.029,-0.427,0.087,-0.427,0.087,-0.280,0.087,-0.280,0.087,-0.280,0.145,-0.280,0.145,-0.500,0.145,-0.500,0.145,-0.500,0.145,-0.240,0.145,-0.240,0.087,-0.240,0.087,-0.093,0.087,-0.093,0.087,-0.093,0.029,-0.093,0.029,-0.020,0.029,-0.020,0.029,-0.020,0.145,-0.020,0.145,-0.240,0.145,-0.093,0.029,-0.167,0.029,-0.167,0.029,-0.167,-0.087,-0.167,-0.087,-0.093,-0.087,-0.093,-0.087,-0.093,0.029,-0.093,0.029,-0.093,0.029,-0.167,-0.087,-0.240,-0.087,-0.240,-0.087,-0.240,-0.145,-0.240,-0.145,-0.167,-0.145,-0.167,-0.145,-0.167,-0.087,0.093,0.145,0.093,0.087,0.093,0.087,0.020,0.087,0.020,0.087,0.020,0.029,0.020,0.029,0.093,0.029,0.093,0.029,0.093,-0.087,0.093,-0.087,0.020,-0.087,0.020,-0.087,0.020,-0.145,0.020,-0.145,0.240,-0.145,0.240,-0.145,0.240,-0.087,0.240,-0.087,0.167,-0.087,0.167,-0.087,0.167,0.145,0.167,0.145,0.093,0.145,0.353,0.145,0.353,0.087,0.353,0.087,0.280,0.087,0.280,0.087,0.280,0.029,0.280,0.029,0.353,0.029,0.353,0.029,0.353,-0.087,0.353,-0.087,0.280,-0.087,0.280,-0.087,0.280,-0.145,0.280,-0.145,0.500,-0.145,0.500,-0.145,0.500,-0.087,0.500,-0.087,0.427,-0.087,0.427,-0.087,0.427,0.145,0.427,0.145,0.353,0.145);
void d5711(in vec2 x, out float ret)
{
    float d;
    dpolygon(.5*x,6.0,d);
    
    x *= .7;
    ret = 1.;
    float da;

    float n = 0.;
    for(int i=0; i<npts/4; ++i)
    {
        vec2 ptsi = vec2(path[4*i], path[4*i+1]),
            ptsip1 = vec2(path[4*i+2], path[4*i+3]),
            k = x-ptsi, 
            d = ptsip1-ptsi;
        
        float beta = k.x/d.x,
            alpha = d.y*k.x/d.x-k.y;
        
        n += step(.0, beta)*step(beta, 1.)*step(0., alpha);
        dlinesegment(x, ptsi, ptsip1, da);
        ret = min(ret, da);
    }
    
    ret = mix(ret, -ret, mod(n, 2.));
    
    ret = max(d,-ret);
    ret /= .7;
}
