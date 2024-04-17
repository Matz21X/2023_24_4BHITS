package at.htlhl.builderpattern;

public class Zylinderbau {
    private final float height;
    private final float diameter;
    private final String bend;
    private final int flowrate;

x
    private Zylinderbau(ZylinderBuilder builder){
        this.height = builder.height;
        this.diameter = builder.diameter;
        this.bend = builder.bend;
        this.flowrate = builder.flowrate;
    }

    public float getHeight(){
        return height;
    }

    public float getDiameter(){
        return diameter;
    }

    public String getBend(){
        return bend;
    }

    public int getFlowrate(){
        return flowrate;
    }

    @Override
    public String toString() {
        return "Zylinderbau{" +
               "height=" + height +
               ", diameter=" + diameter +
               ", bend='" + bend + '\'' +
               ", flowrate=" + flowrate +
               '}';
    }


    public static class ZylinderBuilder {
        private final float height;
        private final float diameter;
        private String bend;
        private int flowrate;

        public ZylinderBuilder(float height, float diameter){
            this.height = height;
            this.diameter = diameter;
        }

        public ZylinderBuilder bend(String bend){
            this.bend = bend;
            return this;
        }

        public ZylinderBuilder flowrate(int flowrate){
            this.flowrate = flowrate;
            return this;
        }

        public Zylinderbau build(){
            Zylinderbau zylinderbau = new Zylinderbau(this);
            return zylinderbau;
        }


    }
}
