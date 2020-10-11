/*jshint esversion: 6 */
// @ts-check

/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

import { GrObject } from "./Framework/GrObject.js";

let carouselCtr = 0;

/**
 * @typedef CarouselProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCarousel extends GrObject {
    /**
     * @param {CarouselProperties} params 
     */
    constructor(params = {}) {
        let width = 3;
        let carousel = new T.Group();

        let base_geom = new T.CylinderGeometry(width, width, 1, 32);
        let base_mat = new T.MeshStandardMaterial({ color: "lightblue", metalness: 0.3, roughness: 0.8 });
        let base = new T.Mesh(base_geom, base_mat);
        base.translateY(0.5);
        carousel.add(base);

        let platform_group = new T.Group();
        base.add(platform_group);
        platform_group.translateY(0.5);

        let platform_geom = new T.CylinderGeometry(0.95 * width, 0.95 * width, 0.2, 32);
        let platform_mat = new T.MeshStandardMaterial({ color: "gold", metalness: 0.3, roughness: 0.8 });
        let platform = new T.Mesh(platform_geom, platform_mat);
        platform_group.add(platform);

        let cpole_geom = new T.CylinderGeometry(0.3 * width, 0.3 * width, 3, 16);
        let cpole_mat = new T.MeshStandardMaterial({ color: "gold", metalness: 0.8, roughness: 0.5 });
        let cpole = new T.Mesh(cpole_geom, cpole_mat);
        platform_group.add(cpole);
        cpole.translateY(1.5);

        let top_trim = new T.Mesh(platform_geom, platform_mat);
        platform_group.add(top_trim);
        top_trim.translateY(3);

        let opole_geom = new T.CylinderGeometry(0.03 * width, 0.03 * width, 3, 16);
        let opole_mat = new T.MeshStandardMaterial({ color: "#aaaaaa", metalness: 0.8, roughness: 0.5 });
        let opole;
        let num_poles = 10;
        let poles = [];
        for (let i = 0; i < num_poles; i++) {
            opole = new T.Mesh(opole_geom, opole_mat);
            platform_group.add(opole);
            opole.translateY(1.5);
            opole.rotateY(2 * i * Math.PI / num_poles);
            opole.translateX(0.8 * width);
            poles.push(opole);
        }

        let horseBody_Geom = new T.CylinderGeometry(0.12 * width, 0.08 * width, 0.7, 16);
        let horseBody_Material = new T.MeshStandardMaterial({ color: "aqua" });
        let horseBody;
        let horseNeck_Geom = new T.CylinderGeometry(0.05 * width, 0.03 * width, 0.4, 16);
        let horseNeck_Material = new T.MeshStandardMaterial({ color: "blue" });
        let horseNeck;
        let horseHead_Geom = new T.SphereGeometry(0.06 * width, 16, 16);
        let horseHead_Material = new T.MeshStandardMaterial({ color: "red" });
        let horseHead;
        let horseLeg_Geom = new T.CylinderGeometry(0.03 * width, 0.02 * width, 0.3, 16);
        let horseLeg_Material = new T.MeshStandardMaterial({ color: "goldenrod" });
        let horseLeg;
        let horses = [];
        for (let i = 0; i < num_poles; i++) {
            horseBody = new T.Mesh(horseBody_Geom, horseBody_Material);
            horseNeck = new T.Mesh(horseNeck_Geom, horseNeck_Material);
            horseHead = new T.Mesh(horseHead_Geom, horseHead_Material);
            let legs = [];
            for (let j = 0; j < 4; j++) {
                horseLeg = new T.Mesh(horseLeg_Geom, horseLeg_Material);
                legs.push(horseLeg);
            }
            horseLeg = new T.Mesh(horseLeg_Geom, horseLeg_Material);
            platform_group.add(horseBody);
            horseBody.translateY(1.5);
            horseBody.rotateY(2 * i * Math.PI / num_poles);
            horseBody.translateX(0.8 * width);
            horseBody.rotateX(Math.PI / 2);
            horseBody.add(horseNeck);
            horseNeck.translateY(-0.5);
            horseNeck.translateZ(-0.3);
            horseNeck.rotateX(Math.PI / 5);
            horseNeck.add(horseHead);
            horseHead.translateY(-0.3);
            legs.forEach(function (horseLeg, index) {
                horseBody.add(horseLeg);
                if (index == 0) {
                    horseLeg.translateZ(0.4);
                    horseLeg.translateY(0.2);
                    horseLeg.translateX(0.15);
                    horseLeg.rotateX(2 * Math.PI / 3);
                } else if (index == 1) {
                    horseLeg.translateZ(0.5);
                    horseLeg.translateY(0.2);
                    horseLeg.translateX(-0.15);
                    horseLeg.rotateX(Math.PI / 3);
                } else if (index == 2) {
                    horseLeg.translateZ(0.3);
                    horseLeg.translateY(-0.2);
                    horseLeg.translateX(0.15);
                    horseLeg.rotateX(Math.PI / 3);
                } else {
                    horseLeg.translateZ(0.3);
                    horseLeg.translateY(-0.2);
                    horseLeg.translateX(-0.15);
                    horseLeg.rotateX(2 * Math.PI / 3);
                }

            })
            horseLeg.translateZ(0.4);
            horseLeg.translateY(0.1);
            horseLeg.translateX(0.15);
            horseLeg.rotateX(Math.PI / 2);
            horses.push(horseBody);
        }


        let roof_geom = new T.ConeGeometry(width, 0.5 * width, 32, 4);
        let roof = new T.Mesh(roof_geom, base_mat);
        carousel.add(roof);
        roof.translateY(4.8);

        // note that we have to make the Object3D before we can call
        // super and we have to call super before we can use this
        super(`Carousel-${carouselCtr++}`, carousel);
        this.whole_ob = carousel;
        this.platform = platform;
        this.poles = poles;
        this.time = 0;
        this.rideable = this.whole_ob;
        // put the object in its place
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
        this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;

        this.rideable = this.whole_ob;

        carousel.scale.set(scale, scale, scale);
        this.advance = function (delta, timeOfDay) {
            this.time += delta / 1000;
            let t = this.time % 1;

            this.whole_ob.rotateY(0.001 * delta);
            horses.forEach(function (horse, index) {
                if (index % 2 == 0) {
                    horse.position.y = 0.3 * Math.sin(Math.PI * 2 * t) + 1.2;
                } else {
                    horse.position.y = -0.3 * Math.cos(Math.PI * 2 * t) + 1.2;
                }
            });
        }
    }
}

let humanCtr = 1;
/**
 * @property {number} x
 * @property {number} z
 */
export class Human extends GrObject {
    constructor(x = 0, z = 0, distance = 10, center = 0, move=false) {
        let human = new T.Group();

        let head_Geom = new T.CubeGeometry(1.5, 1.5, 1);
        let head_Material = new T.MeshStandardMaterial({ color: "ivory" });
        let head = new T.Mesh(head_Geom, head_Material);
        let body_Geom = new T.CubeGeometry(2.5, 3, 1.6);
        let body_Material = new T.MeshStandardMaterial({ color: "green" });
        let body = new T.Mesh(body_Geom, body_Material);
        body.add(head);
        head.translateY(2);
        human.add(body);

        let arm_Geom = new T.CubeGeometry(0.5, 2.5, 0.5);
        arm_Geom.translate(0, -1.1, 0);
        let arm_Material = new T.MeshStandardMaterial({ color: "ivory" });
        let armLeft = new T.Mesh(arm_Geom, arm_Material);
        let armRight = new T.Mesh(arm_Geom, arm_Material);
        body.add(armLeft, armRight);
        armLeft.translateX(1.5);
        armLeft.translateY(0.5);
        armRight.translateX(-1.5);
        armRight.translateY(0.5);

        let leg_Geom = new T.CubeGeometry(0.7, 2, 0.7);
        leg_Geom.translate(0, -0.9, 0);
        let leg_Material = new T.MeshStandardMaterial({ color: "brown" });
        let legLeft = new T.Mesh(leg_Geom, leg_Material);
        let legRight = new T.Mesh(leg_Geom, leg_Material);
        body.add(legLeft, legRight);
        legLeft.translateX(0.6);
        legLeft.translateY(-1.6);
        legRight.translateX(-0.6);
        legRight.translateY(-1.6);

        let armAndLegs = [];
        armAndLegs.push(armLeft, armRight, legRight, legLeft);
        human.scale.set(0.3, 0.3, 0.3);
        human.rotateY(Math.PI / 2);
        let wrapper = new T.Group();
        wrapper.add(human);
        super(`Human-${humanCtr++}`, wrapper);
        wrapper.translateY(0.9);
        wrapper.translateX(x);
        wrapper.translateZ(z);
        this.time = 0;
        this.whole_ob = wrapper;
        this.state = move ? 0 : 3;
        this.distanceCount = 0;
        this.forward = 0;
        this.currentAngle = 0;
        this.goalAngle = Math.PI;
        this.advance = function (delta, timeOfDay) {
            this.time += delta / 1000;
            let t = this.time % 1;

            armAndLegs.forEach(function (part, index) {
                if (index % 2 == 0) {
                    part.rotateX(0.02 * Math.cos(Math.PI * 2 * t + Math.PI));
                } else {
                    part.rotateX(0.02 * Math.cos(Math.PI * 2 * t));
                }
            });

            switch(this.state){
                case 0:
                    this.state = 1;
                    break;
                case 1:
                    if (Math.abs(wrapper.position.x - center) > this.distanceCount ){
                        if (this.forward % 2 == 0) {
                            wrapper.position.x += 0.1;
                            this.distanceCount += 0.1;
                        } else{
                            wrapper.position.x -= 0.1;
                            this.distanceCount += 0.1;
                        }
                    } else{
                        this.forward++;
                        this.distanceCount = 0;
                        center = -center;
                        this.state = 2;
                    }
                    break;
                case 2:
                    let ad = this.goalAngle - this.currentAngle;
                    if (ad > 0.01) {
                        this.currentAngle += 0.05;
                    } else {
                        this.goalAngle += Math.PI;
                        this.state = 1 // moving to next destination
                    }
                    wrapper.setRotationFromEuler(new T.Euler(0, this.currentAngle, 0));
                    break;
                    

            }
        }

        this.rideable = wrapper;
    }
}

let truckCtr = 0;

/**
 * @property {number} x
 * @property {number} z
 * @property {number} theta
 */
export class Truck extends GrObject {
    constructor(x, z, theta = 0) {
        let truck = new T.Group();

        let base_Shape = new T.Shape();
        base_Shape.moveTo(-1.3, 0);
        base_Shape.lineTo(-2.5, 0.2);
        base_Shape.lineTo(-2.5, 1);
        base_Shape.lineTo(-1.3, 1.1);
        base_Shape.lineTo(-1, 2);
        base_Shape.lineTo(0.5, 2);
        base_Shape.lineTo(0.5, 0.8);
        base_Shape.lineTo(3.4, 0.8);
        base_Shape.lineTo(3.45, 1.2);
        base_Shape.lineTo(3.5, 1.2);
        base_Shape.lineTo(3.5, 0);
        base_Shape.lineTo(-1.3, 0);

        let extrudeSettings = {
            steps: 10,
            depth: 2,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.2,
            bevelSegments: 16,
        };
        let base_Geom = new T.ExtrudeGeometry(base_Shape, extrudeSettings);
        base_Geom.scale(0.5, 0.5, 0.5);
        base_Geom.translate(0, 0.3, -0.5);
        let base_Material = new T.MeshStandardMaterial({ color: "yellow" });
        let base = new T.Mesh(base_Geom, base_Material);
        base.castShadow = true;

        let guard_Geom = new T.BoxGeometry(1.5, 0.2, 0.07);
        guard_Geom.translate(1, 0.9, 0);
        let guard1 = new T.Mesh(guard_Geom, base_Material);
        let guard2 = new T.Mesh(guard_Geom, base_Material);
        guard1.translateZ(0.5);
        guard2.translateZ(-0.5);
        base.add(guard1, guard2);

        let sideWindow_Geom = new T.PlaneGeometry(0.6, 0.5);
        sideWindow_Geom.translate(-0.18, 1, 0);
        let windowPic = new T.TextureLoader().load("./Texture/truckWindowTexture.png");
        let sideWindow_Material = new T.MeshStandardMaterial({ color: "skyblue", map: windowPic, side: T.DoubleSide, metalness: 0.02 });
        let sideWindow1 = new T.Mesh(sideWindow_Geom, sideWindow_Material);
        sideWindow1.translateZ(0.61);
        let sideWindow2 = new T.Mesh(sideWindow_Geom, sideWindow_Material);
        sideWindow2.translateZ(-0.61);

        let frontWindow_Geom = new T.PlaneGeometry(0.9, 0.44);
        frontWindow_Geom.rotateY(Math.PI / 2);
        frontWindow_Geom.rotateZ(-Math.PI / 11);
        frontWindow_Geom.translate(-0.67, 1.15, 0);
        let frontWindow_Material = new T.MeshStandardMaterial({ color: "skyblue", map: windowPic, side: T.DoubleSide, metalness: 0.02 });
        let frontwindow = new T.Mesh(frontWindow_Geom, frontWindow_Material);


        let wheelLF = wheelMaker(-1, 1);
        let wheelRF = wheelMaker(-1, -1);
        let wheelLB = wheelMaker(1, 1);
        let wheelRB = wheelMaker(1, -1);

        let frontLight = lightMaker(true);
        frontLight.translateX(-1.36);
        let backLight = lightMaker(false);
        backLight.translateX(1.86);

        truck.add(base, sideWindow1, sideWindow2, frontLight, backLight, frontwindow, wheelLF, wheelRF, wheelLB, wheelRB);
        truck.translateY(0.2);



        function lightMaker(front) {
            let Group = new T.Group();
            let light_Geom = new T.CircleGeometry(0.15, 16);
            light_Geom.rotateY(Math.PI / 2);
            light_Geom.translate(0, 0.6, 0);
            let color, metalness;

            if (front) {
                color = "white";
                metalness = 0.4;
            } else {
                color = "red";
                metalness = 0.5;
            }
            let light_Material = new T.MeshStandardMaterial({ color: color, side: T.DoubleSide, metalness: metalness });
            let leftLight = new T.Mesh(light_Geom, light_Material);
            let rightLight = new T.Mesh(light_Geom, light_Material);
            leftLight.translateZ(0.3);
            rightLight.translateZ(-0.3);
            Group.add(leftLight, rightLight);
            return Group;
        }
        function wheelMaker(front, side) {

            // if front wheel, pass in -1 for moving x to the left, else pass in 1
            // if left wheel, pass in 1 for moving z to front, else pass in -1

            let wheel_Geom = new T.CylinderGeometry(0.3, 0.3, 0.2, 16);
            wheel_Geom.rotateX(Math.PI / 2);
            wheel_Geom.translate(0.3, 0.13, 0);
            let wheel_Material = new T.MeshStandardMaterial({ color: "black" });
            let wheel = new T.Mesh(wheel_Geom, wheel_Material);
            wheel.translateX(0.9 * front);
            wheel.translateZ(0.55 * side);

            let wheelBoss_Geom = new T.CircleGeometry(0.26, 16);
            wheelBoss_Geom.translate(0.3, 0.13, 0.11 * side);
            let wheelBoss_Material = new T.MeshStandardMaterial({metalness: 0.2, side: T.DoubleSide });
            let wheelBoss = new T.Mesh(wheelBoss_Geom, wheelBoss_Material);
            wheel.add(wheelBoss);
            return wheel;
        }


        truck.rotateY(Math.PI / 2);
        let rotatedTruck = new T.Group();
        rotatedTruck.add(truck);
        super(`truck-${truckCtr++}`, rotatedTruck);
        let curve = new T.CatmullRomCurve3([

            new T.Vector3(30, 1, -30),
            new T.Vector3(30, 1, 30),
            new T.Vector3(-30, 1, 30),
            new T.Vector3(-30, 1, -30),


        ], true, "catmullrom", 0.2);
        curve.arcLengthDivisions = 1200;

        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(0.2);
        rotatedTruck.add(this.ridePoint);
        this.rideable = this.ridePoint;


        this.curve = curve;
        this.car = rotatedTruck;
        this.u = 0;
        this.advance = function (delta, toimeofday) {
            //this.car.rotateY(delta/1000*Math.PI);

            this.u += delta / 12000;

            let k = this.u % 1;

            let v = this.curve.getTangentAt(k);

            let zAngle = Math.atan2(v.z, v.x);
            // turn the object so the Z axis is facing in that direction
            this.car.rotation.y = -zAngle + Math.PI / 2;





            this.car.position.x = this.curve.getPointAt(k).x;
            this.car.position.z = this.curve.getPointAt(k).z;


        }
    }
}

export class GrTrain extends GrObject {
    constructor(x, z, theta) {



        let Track = new T.Group();

        let baseGeo = new T.CylinderGeometry(30, 35, 4, 32);
        let baseMat = new T.MeshStandardMaterial({ color: "goldenrod" });
        let base = new T.Mesh(baseGeo, baseMat);
        base.translateY(2);

        Track.add(base);


        let poleGeo = new T.CylinderGeometry(1, 1, 16, 32);
        let poleMat = new T.MeshStandardMaterial({ color: "sliver" });

        let pole1 = new T.Mesh(poleGeo, poleMat);
        base.add(pole1);
        pole1.translateY(8);
        pole1.translateX(-25);

        let pole2 = new T.Mesh(poleGeo, poleMat);
        base.add(pole2);
        pole2.translateY(8);
        pole2.translateZ(-20);


        let pole2Geo = new T.CylinderGeometry(1, 1, 12, 32);
        let pole2Mat = new T.MeshStandardMaterial({ color: "sliver" });
        let pole3 = new T.Mesh(pole2Geo, pole2Mat);
        base.add(pole3);
        pole3.translateY(6);
        pole3.translateX(25);


        let pole3Geo = new T.CylinderGeometry(1, 1, 26, 32);
        let pole3Mat = new T.MeshStandardMaterial({ color: "sliver" });
        let pole4 = new T.Mesh(pole3Geo, pole3Mat);
        base.add(pole4);
        pole4.translateY(13);
        pole4.translateZ(25);








        Track.translateY(0.5);
        //Create a sine-like wave
        var curve = new T.CatmullRomCurve3([
            new T.Vector3(-25, 0, 0),
            new T.Vector3(0, 0, -20),
            new T.Vector3(25, -4, 0),
            new T.Vector3(0, 10, 25),

        ], true, "catmullrom", 1);

        curve.arcLengthDivisions = 1200;



        var points = curve.getPoints(50);
        var geometry2 = new T.TubeGeometry(curve, 40, 0.2, 40, false);


        var material = new T.MeshStandardMaterial({ color: 0xff0000, side: T.DoubleSide });

        var Mat = new T.MeshStandardMaterial({ color: "sliver", side: T.DoubleSide });





        let newcubeGeo = new T.SphereGeometry(0.6, 32, 32);
        let CenS = new T.Mesh(newcubeGeo, Mat);







        // Create the final object to add to the scene
        var splineObject = new T.Mesh(geometry2, material);



        splineObject.translateY(18);


        splineObject.add(CenS);

        Track.add(splineObject);



        //make a train 

        let bodyMat = new T.MeshStandardMaterial({ color: "yellow" });

        let partMat = new T.MeshStandardMaterial({ color: "black", metalness: 0.2 });


        let frontGeo = new T.CylinderGeometry(1.5, 1.5, 6, 12);
        frontGeo.rotateX(Math.PI / 2)

        let bodyGeo = new T.BoxGeometry(3, 4, 3);

        let body = new T.Mesh(bodyGeo, bodyMat)
        CenS.add(body);
        body.translateZ(-1.0);

        let front = new T.Mesh(frontGeo, bodyMat);
        front.translateZ(2.5);
        front.translateY(-0.4);
        CenS.add(front);

        //wheels

        let wheelGeo = new T.CylinderGeometry(1.5, 1.5, 4, 14);
        wheelGeo.rotateZ(Math.PI / 2);

        let wheel1 = new T.Mesh(wheelGeo, partMat);
        wheel1.translateY(-1.4);
        wheel1.translateZ(-1.5);
        CenS.add(wheel1);

        let wheelfGeo = new T.CylinderGeometry(1, 1, 4, 14);
        wheelfGeo.rotateZ(Math.PI / 2);

        let wheel2 = new T.Mesh(wheelfGeo, partMat);
        wheel2.translateY(-1.8);
        wheel2.translateZ(1.5);
        CenS.add(wheel2);

        let wheel3 = new T.Mesh(wheelfGeo, partMat);
        wheel3.translateY(-1.8);
        wheel3.translateZ(4.5);
        CenS.add(wheel3);














        //final translation 
        Track.translateY(-0.35);

        Track.translateX(x);
        Track.translateZ(z);
        Track.rotateY(theta)

        Track.scale.set(0.2, 0.2, 0.2);

        super("Train", Track);





        this.x = x;
        this.z = z;

        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(18);
        body.add(this.ridePoint);
        this.rideable = this.ridePoint;

        this.car = Track;
        this.cube = CenS
        this.curve = curve;
        this.u = 0;
    }
    advance(delta, toimeofday) {
        //this.car.rotateY(Delta/1000*Math.PI);
        this.u += delta / 3000;

        let k = this.u % 1;

        let l = (k + 0.23) % 1;

        let pos = this.curve.getPointAt(l);


        //let dir = this.curve.getTangentAt(k).normalize();

        // let angle = Math.acos(dir.dot(new T.Vector3(0,0,1)));

        // let axis = dir.cross(new T.Vector3(0,0,1)).normalize();

        //let zAngle = Math.atan2(dir.z,dir.x);

        // turn the object so the Z axis is facing in that direction
        //this.cube.rotation.y = -zAngle + Math.PI/2;

        this.cube.lookAt(pos.x + this.x, pos.y + 3, pos.z + this.z);




        this.cube.position.x = this.curve.getPointAt(k).x;
        this.cube.position.z = this.curve.getPointAt(k).z;
        this.cube.position.y = this.curve.getPointAt(k).y + 4;

    }



}

let droneCtr = 0

export class Drone extends GrObject {
    constructor() {
        // Making a drone
        let bodyGroup = new T.Group();
        let bodyGeom = new T.CylinderGeometry(1, 1, 30, 4, 30, false);
        let bodyMaterial = new T.MeshStandardMaterial({ color: "milky", emissiveIntensity: 1, metalness: 0.5, skinning: true, roughness: .5 });
        let bodyMesh = new T.Mesh(bodyGeom, bodyMaterial);
        //bodyGroup.add(bodyMesh);
        bodyMesh.scale.set(0.1, 0.08, 0.1);
        bodyMesh.position.y = 0;
        bodyMesh.rotateZ(Math.PI / 2);

        let CPUGeom = new T.CylinderGeometry(2, 3.5, 1, 4, 20, false);
        let CPUMaterial = new T.MeshStandardMaterial({ color: "orange", metalness: 0.9, roughness: 0.5, side: T.DoubleSide });
        let CPUMesh = new T.Mesh(CPUGeom, CPUMaterial);
        bodyGroup.add(CPUMesh);
        CPUMesh.scale.set(0.25, 0.25, 0.25);
        CPUMesh.position.y = 0;
        CPUMesh.rotateY(Math.PI / 4);

        let frontGeom = new T.CylinderGeometry(2, 3.5, 0.7, 3, 20, false);
        let frontMaterial = new T.MeshStandardMaterial({ color: "red", metalness: 0.8, roughness: 0.4, side: T.DoubleSide });
        let frontMesh = new T.Mesh(frontGeom, frontMaterial);
        //bodyGroup.add(frontMesh);
        frontMesh.scale.set(0.2, 0.2, 0.3)
        frontMesh.position.set(0.45, 2, 0.45)
        frontMesh.rotateOnWorldAxis(new T.Vector3(0, 1, 0), Math.PI / 4);

        let armMesh1 = new T.Mesh(bodyGeom, bodyMaterial);
        bodyGroup.add(armMesh1);
        armMesh1.scale.set(0.1, 0.1, 0.1);

        armMesh1.rotateX(Math.PI / 2);
        armMesh1.rotateZ(Math.PI / 2);

        let armMesh2 = new T.Mesh(bodyGeom, bodyMaterial);
        bodyGroup.add(armMesh2);
        armMesh2.scale.set(0.1, 0.1, 0.1);

        armMesh2.rotateX(Math.PI / 2);


        let propeller1 = propellerMaker();
        let propeller2 = propellerMaker();
        let propeller3 = propellerMaker();
        let propeller4 = propellerMaker();
        let propellers = [propeller1, propeller2, propeller3, propeller4];
        armMesh1.add(propeller1, propeller2);
        propeller1.position.set(0, -15, -3);
        propeller2.position.set(0, 15, -3);
        armMesh2.add(propeller3, propeller4);
        propeller3.position.set(0, -15, -3);
        propeller4.position.set(0, 15, -3);

        bodyGroup.translateY(15);

        function propellerMaker() {
            let propellerGroup = new T.Group();

            let protectorGeom = new T.CylinderGeometry(28, 24, 4, 20, 10, true);
            let protectorMaterial = new T.MeshStandardMaterial({ color: "white", emissiveIntensity: 2, metalness: 2, side: T.DoubleSide })
            let protectorMesh = new T.Mesh(protectorGeom, protectorMaterial);

            let holderGeom = new T.ConeGeometry(5, 30, 20, 20, false);
            let holderMaterial = new T.MeshStandardMaterial({ color: "black", emissiveIntensity: 1, metalness: 0.8, side: T.DoubleSide })
            let holderMesh = new T.Mesh(holderGeom, holderMaterial);

            let propellerGeom = new T.CylinderGeometry(3, 1, 20, 2, 1, false);
            let propellerMaterial = new T.MeshStandardMaterial({ color: "red", emissiveIntensity: 1, metalness: 0.8, side: T.DoubleSide });
            let propellerMesh1 = new T.Mesh(propellerGeom, propellerMaterial);
            let propellerMesh2 = new T.Mesh(propellerGeom, propellerMaterial);

            propellerGroup.add(protectorMesh);
            protectorMesh.rotateZ(Math.PI / 2);

            propellerGroup.add(holderMesh);
            holderMesh.rotateZ(Math.PI / 2);
            holderMesh.rotateX(Math.PI);
            holderMesh.position.x -= 3.5;

            propellerGroup.add(propellerMesh1, propellerMesh2);
            propellerMesh2.rotateOnWorldAxis(new T.Vector3(0, 0, 1), Math.PI);
            propellerMesh1.position.y -= 10.25;
            propellerMesh2.position.y += 10.25;
            propellerGroup.position.y = 3;
            propellerGroup.scale.set(0.2, 0.2, 0.2);
            propellerGroup.rotateOnWorldAxis(new T.Vector3(0, 1, 0), Math.PI / 2);
            return propellerGroup;
        }


        let curve = new T.CatmullRomCurve3([

            new T.Vector3(20, 10, 20),
            new T.Vector3(20, 3, -20),
            new T.Vector3(-20, 20, 20),
            new T.Vector3(-20, 5, -20),


        ], true, "catmullrom", 1);
        curve.arcLengthDivisions = 1200;

        super(`Drone-${droneCtr++}`, bodyGroup);
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(0.2);
        bodyGroup.add(this.ridePoint);
        this.rideable = this.ridePoint;


        this.whole_ob = bodyGroup;
        this.time = 0;
        this.u = 0;
        this.curve = curve;
        this.advance = function (delta, timeOfDay) {
            this.time += delta / 8000;
            this.u = this.time % 1;


            propellers.forEach(function (propeller) {
                propeller.rotateOnWorldAxis(new T.Vector3(0, 0, 1), 0.3);
            });

            let v = this.curve.getTangentAt(this.u);
            this.whole_ob.position.x = this.curve.getPointAt(this.u).x;
            this.whole_ob.position.y = this.curve.getPointAt(this.u).y + 15;
            this.whole_ob.position.z = this.curve.getPointAt(this.u).z;

        }
        this.rideable = this.whole_ob;

    }


}
export class TrainTrack extends GrObject {
    constructor() {
        let aa = 34;
        let closedSpline = new T.CatmullRomCurve3([
            new T.Vector3(0, 1, -aa),
            new T.Vector3(aa, 1, 0),
        ], true, "catmullrom", 1);

        // Set up settings for later extrusion
        let extrudeSettings = {
            steps: 300,
            bevelEnabled: false,
            extrudePath: closedSpline
        };

        // Define a triangle
        let pts = [], count = 2;
        for (let i = 0; i < count; i++) {
            let l = 8;
            let a = 2 * i / count * Math.PI;
            pts.push(new T.Vector2(0.05 * Math.cos(a) * l, 0.05 * Math.sin(a) * l));
        }
        let shape = new T.Shape(pts);

        // Extrude the triangle along the CatmullRom curve
        let geometry = new T.ExtrudeBufferGeometry(shape, extrudeSettings);
        let material = new T.MeshLambertMaterial({ color: 0xb00000, wireframe: false });

        // Create mesh with the resulting geometry
        let mesh = new T.Mesh(geometry, material);
        let track = new T.Group();
        track.add(mesh);
        //track.rotateZ(Math.PI / 2);
        super("track", track);
    }
}

export class carTrack extends GrObject{
    constructor(){
        let curve_Path = new T.CatmullRomCurve3( [
            new T.Vector3(30, 0.2, -30),
            new T.Vector3(30, 0.2, 30),
            new T.Vector3(-30, 0.2, 30),
            new T.Vector3(-30, 0.2, -30),


        ], true, "catmullrom", 0.2);
        curve_Path.arcLengthDivisions = 1200;
        let curve_Geom = new T.TubeGeometry(curve_Path, 300, 0.2, 40, false);
        let curve_Material = new T.MeshStandardMaterial({color:"yellow"});
        let curve = new T.Mesh(curve_Geom, curve_Material);
        super("track", curve);
    }
}

let roadCtr = 0;

export class Road extends GrObject {
    constructor(x = 0, z = 0, theta = 0, y = 0) {
        let path = new T.CatmullRomCurve3([
            new T.Vector3(x, 0.5, z),
            new T.Vector3(-x, 0.5, -z)
        ])
        let road_Geom = new T.TubeGeometry(path, 100, 2, 2);
        let road_Material = new T.MeshStandardMaterial({ color: "grey" });
        let road = new T.Mesh(road_Geom, road_Material);
        road.rotateY(theta);
        road.translateY(y);
        super(`road-${roadCtr++}`, road);
    }
}

let spinnerObCtr = 0;

// A whatever you want to call that, just spins.
/**
 * @typedef SpinnerProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrSpinner extends GrObject {
	/**
	 * @param {SpinnerProperties} params
	 */
    constructor(params = {}) {

        let width = 2;
        let spinner = new T.Group();

        let centerGeom = new T.CylinderGeometry(0.1 * width, 0.1 * width, 3, 8);
        let centerMaterial = new T.MeshStandardMaterial({ color: "ivory" });
        let center = new T.Mesh(centerGeom, centerMaterial);
        center.translateY(1.5);
        spinner.add(center);

        let topGeom = new T.ConeGeometry(width, 0.5 * width, 8, 16, true);
        let topMaterial = new T.MeshStandardMaterial({ color: "yellow", metalness: 0.2, side: T.DoubleSide });
        let top = new T.Mesh(topGeom, topMaterial);
        spinner.add(top);

        let poleGeom = new T.CylinderGeometry(0.03 * width, 0.03 * width, 2, 4, 4);
        let poleMaterial = new T.MeshStandardMaterial({ color: 0x28c9ff });
        let poleJoint;
        let pole;
        let num_chairs = 8;
        let poles = [];

        let chairGeom = new T.CylinderGeometry(0.08 * width, 0.14 * width, 0.3, 20);
        let chairMaterial = new T.MeshStandardMaterial({ color: 0xff6d6d, metalness: 0.5, roughness: 0.2 });
        let chair;
        let chairs = [];

        let endGeom = new T.BoxGeometry(0.8, 0.2, 0.8);
        let endMaterial = new T.MeshStandardMaterial({ color: "red" });
        let end;

        for (let i = 0; i < num_chairs; i++) {
            pole = new T.Mesh(poleGeom, poleMaterial);
            chair = new T.Mesh(chairGeom, chairMaterial);
            end = new T.Mesh(endGeom, endMaterial)
            pole.castShadow = true;
            chair.castShadow = true;
            end.castShadow = true;
            poleJoint = new T.Group()
            poleJoint.add(pole);
            pole.add(chair, end);
            chair.position.y -= 0.2;
            end.position.y -= 1;
            spinner.add(poleJoint);
            pole.translateY(-1);
            poleJoint.translateY(2.4);
            poleJoint.rotateY(2 * i * Math.PI / num_chairs);
            poleJoint.translateX(1.6);
            poleJoint.rotateZ(Math.PI / 3);
            poles.push(poleJoint);
            chairs.push(chair);
        }
        top.translateY(3);
        super(`Spinner-${spinnerObCtr++}`, spinner);
        this.whole_ob = spinner;
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
        this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        this.rideable = this.whole_ob;
        let scale = params.size ? Number(params.size) : 1;
        spinner.scale.set(scale, scale, scale);
        this.time = 0;
        this.advance = function (delta, timeOfDay) {
            this.time += delta / 1000;
            let t = this.time % 1;

            this.whole_ob.rotateY(0.002 * delta);
            // poles.forEach(function (pole, index) {
            //     if (index % 2 == 0) {
            //         pole.rotateZ(0.025 * Math.sin(Math.PI * 2 * t));
            //     } else {
            //         pole.rotateZ(0.025 * Math.cos(Math.PI * 2 * t));
            //     }
            // });
            chairs.forEach(function (chair, index) {
                if (index % 2 == 0) {
                    chair.position.y = (0.5 * Math.sin(Math.PI * 2 * t));
                } else {
                    chair.position.y = (-0.5 * Math.cos(Math.PI * 2 * t));
                }
            });
        }
    }
}

let concreteCtr = 0;

export class Concrete extends GrObject {
    constructor(x = 0, z = 0) {
        let hill_Geom = new T.CylinderGeometry(1, 2, 2, 16, 16, false);
        let hill_Texture = new T.TextureLoader().load("./Textures/AnotherBump.jpg");
        let hill_Material = new T.MeshStandardMaterial({ color: "ivory", bumpMap: hill_Texture });
        let hill = new T.Mesh(hill_Geom, hill_Material);
        hill.position.set(x, 1.5, z);
        super(`Concrete-${concreteCtr++}`, hill);
    }
}

let forkLiftObCtr = 0;
// A fork lift
/**
 * @typedef forkLiftProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrForkLift extends GrObject {
    /**
     * @param {forkLiftProperties} params
     */
    constructor(params = {}) {
        let forkLift = new T.Group(); // The overall group for whole object
        let yellow_Material = new T.MeshStandardMaterial({ color: "yellow", metalness: 0.5, roughness: 0.7 });
        let black_Material = new T.MeshStandardMaterial({ color: "#888888", metalness: 0.6, roughness: 0.3 });
        let wheel_Material = new T.MeshStandardMaterial({ color: "black", roughness: 0.3 });
        let lift_Material = new T.MeshStandardMaterial({ color: "silver", metalness: 0.2 });

        let liftBase_Geom = new T.BoxGeometry(2, 1.3, 1);
        let liftBase = new T.Mesh(liftBase_Geom, yellow_Material);
        let liftDriverRoom_Geom = new T.BoxGeometry(0.8, 0.8, 1);
        let liftDriverRoom = new T.Mesh(liftDriverRoom_Geom, black_Material);
        liftDriverRoom.translateY(1);
        liftBase.translateY(0.8);
        forkLift.add(liftBase);

        let wheel_Geom = new T.TorusGeometry(0.3, 0.25, 16, 16);
        wheel_Geom.translate(-0.5, -0.25, 0);
        let smallWheel_Geom = new T.TorusGeometry(0.2, 0.15, 16, 16);
        smallWheel_Geom.translate(0.6, -0.45, 0);
        let wheel1 = new T.Mesh(wheel_Geom, wheel_Material);
        let wheel2 = new T.Mesh(wheel_Geom, wheel_Material);
        let wheel3 = new T.Mesh(smallWheel_Geom, wheel_Material);
        let wheel4 = new T.Mesh(smallWheel_Geom, wheel_Material);
        liftBase.add(liftDriverRoom, wheel1, wheel2, wheel3, wheel4);
        wheel1.translateZ(0.7);
        wheel2.translateZ(-0.7);
        wheel3.translateZ(-0.7);
        wheel4.translateZ(0.7);

        let liftTracks = new T.Group();
        let exSettings = {
            steps: 1,
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 2
        };
        let track_curve = new T.Shape();
        track_curve.moveTo(-0.5, 0);
        track_curve.lineTo(-0.5, 2);
        track_curve.lineTo(-0.25, 2.25);
        track_curve.lineTo(-0.25, 8);
        track_curve.lineTo(-0.2, 8);
        track_curve.lineTo(-0.2, 9.5);
        track_curve.lineTo(0.2, 9.5);
        track_curve.lineTo(0.2, 8);
        track_curve.lineTo(0.25, 8);
        track_curve.lineTo(0.25, 2.25);
        track_curve.lineTo(0.5, 2);
        track_curve.lineTo(0.5, 0);
        track_curve.lineTo(-0.5, 0);
        let liftTrack_Geom = new T.ExtrudeGeometry(track_curve, exSettings);
        liftTrack_Geom.rotateY(Math.PI / 2);
        liftTrack_Geom.scale(0.3, 0.3, 0.3);
        let liftTrack1 = new T.Mesh(liftTrack_Geom, black_Material);
        let liftTrack2 = new T.Mesh(liftTrack_Geom, black_Material);
        liftTracks.add(liftTrack1, liftTrack2);
        liftTrack1.translateZ(0.25);
        liftTrack2.translateZ(-0.25);
        liftTracks.translateX(1);
        liftTracks.translateY(-0.7);
        liftBase.add(liftTracks);

        let liftJoint = new T.Group();
        let liftSettings = {
            steps: 1,
            depth: 0.07,
            bevelEnabled: true,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelSegments: 2
        };
        let lift_curve = new T.Shape();
        lift_curve.moveTo(-0.6, 0);
        lift_curve.lineTo(-0.5, 2);
        lift_curve.lineTo(-0.5, 5);
        lift_curve.lineTo(-0.3, 7);
        lift_curve.lineTo(0.3, 7);
        lift_curve.lineTo(0.5, 5);
        lift_curve.lineTo(0.5, 2);
        lift_curve.lineTo(0.6, 0);
        lift_curve.lineTo(-0.6, 0);
        let lift_Geom = new T.ExtrudeGeometry(lift_curve, liftSettings);
        lift_Geom.rotateZ(-Math.PI / 2);
        lift_Geom.rotateX(Math.PI / 2);
        lift_Geom.scale(0.25, 0.25, 0.25);
        let lift1 = new T.Mesh(lift_Geom, lift_Material);
        let lift2 = new T.Mesh(lift_Geom, lift_Material);
        liftJoint.add(lift1, lift2);
        lift1.translateZ(0.26);
        lift2.translateZ(-0.26);
        liftTracks.add(liftJoint);
        forkLift.rotateY(Math.PI / 2);
        let wrapper = new T.Group();
        wrapper.add(forkLift);
        wrapper.rotateY(-Math.PI / 2);
        wrapper.position.set(params.x, 0, params.z);
        super(`forkLift-${forkLiftObCtr++}`, wrapper);
        this.whole_ob = wrapper;
        this.liftArms = liftJoint;
        this.state = 0;
        // controls where the lift should go
        this.destination = [];
        this.destination.push([params.x, params.z], [params.x + 10, params.z]);
        this.time = 0;
        // next is used for choosing destination
        this.next = 1;
        // these two controls rotation. Each turning will increment goalangle by Pi
        this.goalangle = Math.PI / 2;
        this.currentangle = 0; // and currentangle keeps incrementing
        // these two controls the behavior of loading
        this.load = true;
        this.loadspeed = 0.02;

        this.rideable = this.whole_ob;
    }
    advance(delta, timeOfDay) {
        this.time += delta / 1000;
        let deltaslowed = delta / 200;

        switch (this.state) {
            case 0:
                this.state = 1;
                break;
            case 1: // move to Destination
                let dx = this.destination[this.next % 2][0] - this.whole_ob.position.x;
                let dz = this.destination[this.next % 2][1] - this.whole_ob.position.z;
                let dst = Math.sqrt(dx * dx + dz * dz);
                let ds = deltaslowed * 1.5;
                if (dst > 0.1) {
                    this.whole_ob.position.x += dx * ds / dst;
                    this.whole_ob.position.z += dz * ds / dst;
                } else {
                    this.whole_ob.position.x = this.destination[this.next % 2][0];
                    this.whole_ob.position.z = this.destination[this.next % 2][1];
                    this.state = 2; // start loading
                }
                break;
            case 2: // move arms
                if (this.load) {
                    this.liftArms.position.y += this.loadspeed;
                    if (Math.abs(this.liftArms.position.y - 2) <= 0.05) {
                        this.load = false;
                        this.state = 3;
                    }
                } else {
                    this.liftArms.position.y -= this.loadspeed;
                    if (Math.abs(this.liftArms.position.y - 0) <= 0.05) {
                        this.load = true;
                        this.state = 3; // turn around
                    }
                }

                break;
            case 3: // rotate 180 degrees
                let ad = this.goalangle - this.currentangle;
                if (ad > 0.1) {
                    this.currentangle += 0.05;
                } else {
                    this.next++;
                    this.goalangle += Math.PI;
                    this.state = 1 // moving to next destination
                }
                this.whole_ob.setRotationFromEuler(new T.Euler(0, this.currentangle, 0));
                break;


        }
    }

}

/**
* @property {number} x=0
* @property {number} z=0
* @property {number} theta=0
*/
export class Church extends GrObject {
    constructor(x = 0, z = 0, theta = 0) {
        let church = new T.Group();
        let body = bodyMaker(1);
        body.translateY(0.75);
        let corridor = bodyMaker(0.5, 0.6);
        corridor.translateY(0.3);
        corridor.translateZ(2);

        let door_Geom = new T.PlaneGeometry(0.4, 0.6);
        door_Geom.translate(0, 0.3, 3.025);
        let doorPic = new T.TextureLoader().load("./Textures/doorTexture.png");
        let door_Material = new T.MeshStandardMaterial({ map: doorPic, metalness: 0.05 });
        let door = new T.Mesh(door_Geom, door_Material);

        let window_Geom = new T.PlaneGeometry(0.7, 0.7);
        window_Geom.rotateY(Math.PI / 2);
        window_Geom.translate(0, 0.8, 0);
        let windowPic = new T.TextureLoader().load("/Textures/churchWindow.png");
        let window_Material = new T.MeshStandardMaterial({ map: windowPic, side: T.DoubleSide, metalness: 0.01 });
        let window1 = new T.Mesh(window_Geom, window_Material);
        let window2 = new T.Mesh(window_Geom, window_Material);
        let window3 = new T.Mesh(window_Geom, window_Material);
        let window4 = new T.Mesh(window_Geom, window_Material);
        window1.translateX(1.02);
        window1.translateZ(0.9);
        window2.translateX(1.02);
        window2.translateZ(-0.9);
        window3.translateX(-1.02);
        window3.translateZ(0.9);
        window4.translateX(-1.02);
        window4.translateZ(-0.9);
        church.add(body, corridor, door, window1, window2, window3, window4);
        church.translateX(x);
        church.translateZ(z);
        church.rotateY(theta);
        church.scale.set(3, 3, 3);
        super("Church", church);
        function bodyMaker(scale = 1, metalness = 0.2) {
            let church = new T.Group();

            let base_Geom = new T.BoxGeometry(2, 1.5, 4);
            let base_Material = new T.MeshStandardMaterial({ color: "ivory" });
            let base = new T.Mesh(base_Geom, base_Material);

            let top_Geom = new T.CylinderGeometry(1.5, 1.5, 4, 3);
            top_Geom.rotateX(-Math.PI / 2);
            top_Geom.translate(0, 1.82, 0);
            top_Geom.scale(1, 0.7, 1);
            let top_Material = new T.MeshStandardMaterial({ color: "grey", metalness: metalness });
            let top = new T.Mesh(top_Geom, top_Material);

            let circle_Geom = new T.CircleGeometry(0.4, 16);
            circle_Geom.translate(0, 1.4, 0);
            let smallCircle_Geom = new T.CircleGeometry(0.2, 16);
            smallCircle_Geom.translate(0, 0.5, 2.02);
            let circlePic = new T.TextureLoader().load("./Textures/circleWindow.jpg");
            let smallCirclePic = new T.TextureLoader().load("./Textures/smallCircleWindow.jpg");
            let circle_Material = new T.MeshStandardMaterial({ map: circlePic, metalness: 0.2, side: T.DoubleSide });
            let smallCircle_Material = new T.MeshStandardMaterial({ map: smallCirclePic, metalness: 0.2 });
            let circle1 = new T.Mesh(circle_Geom, circle_Material);
            let circle2 = new T.Mesh(circle_Geom, circle_Material);
            circle1.translateZ(2.02);
            circle2.translateZ(-2.02)
            let smallCircle1 = new T.Mesh(smallCircle_Geom, smallCircle_Material);
            let smallCircle2 = new T.Mesh(smallCircle_Geom, smallCircle_Material);
            smallCircle1.translateX(-0.6);
            smallCircle2.translateX(0.6);

            let cross = new T.Group();
            let crossV_Geom = new T.BoxGeometry(0.1, 1, 0.1);
            let crossH_Geom = new T.BoxGeometry(0.8, 0.1, 0.1);
            crossH_Geom.translate(0, 0.2, 0);
            let cross_Material = new T.MeshStandardMaterial({ color: 0x9F5201, metalness: 0.5 });
            let crossV = new T.Mesh(crossV_Geom, cross_Material);
            let crossH = new T.Mesh(crossH_Geom, cross_Material);
            cross.add(crossV, crossH);
            cross.translateY(2.8);
            cross.translateZ(1.6);
            church.add(base, top, circle1, circle2, smallCircle1, smallCircle2, cross);
            church.scale.set(scale, scale, scale);
            return church;
        }
    }
}

let houseCtr = 0;

/**
 * @property {number} x=0
 * @property {number} z=0
 * * @property {number} theta=0
 */
export class House extends GrObject {
    constructor(x = 0, z = 0, theta = 0) {
        let house = new T.Group();
        // Basic idea is to make seperate meshes for roof and body, then combine as a group
        let base_Geom = new T.BoxGeometry(3, 2.5, 2); //  body of building
        let base_Material = new T.MeshStandardMaterial({ color: "pink" });
        let base = new T.Mesh(base_Geom, base_Material);

        let door_Geom = new T.PlaneGeometry(0.5, 0.8);
        door_Geom.translate(0, -0.7, 1.02);
        let doorPic = new T.TextureLoader().load("./Textures/doorTexture.png");
        let door_Material = new T.MeshStandardMaterial({ map: doorPic, metalness: 0.05 });
        let door = new T.Mesh(door_Geom, door_Material);

        // Making windows
        let window_Geom = new T.PlaneGeometry(0.7, 0.7);
        window_Geom.translate(0, 0.6, 1.02);
        // Move the window to the front of building, we got to control the position of windows individually
        let windowPic = new T.TextureLoader().load("/Textures/windowTexture.jpg");
        let window_Material = new T.MeshStandardMaterial({ map: windowPic, roughness: 0.3 });
        let window1 = new T.Mesh(window_Geom, window_Material);
        let window2 = new T.Mesh(window_Geom, window_Material);
        let window3 = new T.Mesh(window_Geom, window_Material);
        let window4 = new T.Mesh(window_Geom, window_Material);
        window1.translateX(-0.6);
        window2.translateX(0.6);
        window3.translateX(0.8);
        window3.translateY(-1);
        window4.translateX(-0.8);
        window4.translateY(-1);

        let roof_Geom = new T.Geometry();
        roof_Geom.vertices.push(new T.Vector3(0, 1, 0)) // 0, top
        roof_Geom.vertices.push(new T.Vector3(-1.7, 0, 1.2)); // 1, left front
        roof_Geom.vertices.push(new T.Vector3(1.7, 0, 1.2)); // 2, right front
        roof_Geom.vertices.push(new T.Vector3(1.7, 0, -1.2)); // 3, right back
        roof_Geom.vertices.push(new T.Vector3(-1.7, 0, -1.2));// 4, left back
        roof_Geom.faceVertexUvs = [[]];
        let f1 = new T.Face3(0, 1, 2);
        let f2 = new T.Face3(0, 2, 3);
        let f3 = new T.Face3(0, 3, 4);
        let f4 = new T.Face3(0, 4, 1);
        roof_Geom.faces.push(f1, f2, f3, f4);
        roof_Geom.faceVertexUvs[0].push([new T.Vector2(0.5, 1), new T.Vector2(0, 0), new T.Vector2(1, 0)]);
        roof_Geom.faceVertexUvs[0].push([new T.Vector2(0.5, 1), new T.Vector2(0, 0), new T.Vector2(1, 0)]);
        roof_Geom.faceVertexUvs[0].push([new T.Vector2(0.5, 1), new T.Vector2(0, 0), new T.Vector2(1, 0)]);
        roof_Geom.faceVertexUvs[0].push([new T.Vector2(0.5, 1), new T.Vector2(0, 0), new T.Vector2(1, 0)]);
        roof_Geom.computeFaceNormals();
        roof_Geom.uvsNeedUpdate = true;

        let roofPic = new T.TextureLoader().load("./Textures/roofTexture.jpg");
        let roof_Material = new T.MeshStandardMaterial({ map: roofPic, roughness: 0.3 });
        let roof = new T.Mesh(roof_Geom, roof_Material);
        roof.translateY(1.2);
        house.add(base, roof, door, window1, window2, window3, window4);
        house.translateY(1.25);

        house.translateX(x);
        house.translateZ(z);
        house.rotateY(theta);
        super(`House-${houseCtr++}`, house);
    }
}

let buildingCtr = 0;

/**
 * @property {number} x=0
 * @property {number} z=0
 * @property {number} theta=0
 */
export class Building extends GrObject {
    constructor(x = 0, z = 0, theta = 0) {

        let Building = new T.Group();
        let baseGeo = new T.BoxGeometry(1.5, 2.6, 1.5);
        let baseMat = new T.MeshStandardMaterial({ color: "grey" })
        let base = new T.Mesh(baseGeo, baseMat);
        base.translateY(1.3);
        Building.add(base);
        //
        let topGeo = new T.BoxGeometry(1.3, 1.5, 1.3);
        let top = new T.Mesh(topGeo, baseMat);
        top.translateY(1.6);
        base.add(top);
        //

        let needleMat = new T.MeshStandardMaterial({ color: "sliver", metalness: 0.9 });
        let needleGeo = new T.ConeGeometry(0.05, 1, 32);
        let needle = new T.Mesh(needleGeo, needleMat);
        needle.translateY(1.1);
        top.add(needle);

        let ballGeo = new T.SphereGeometry(0.1, 32, 32);
        let ball = new T.Mesh(ballGeo, needleMat);
        ball.translateY(0.3);
        needle.add(ball);

        //building texture
        let Bt = new T.TextureLoader().load("./Textures/buildingTexture.jpg");
        let tMat = new T.MeshStandardMaterial({ map: Bt })
        let tPGeo = new T.PlaneGeometry(1.5, 2.6);
        let Bf = new T.Mesh(tPGeo, tMat)
        Bf.translateZ(0.7502);
        base.add(Bf);

        let Br = new T.Mesh(tPGeo, tMat)
        Br.rotateY(Math.PI / 2);
        Br.translateZ(0.7502);
        base.add(Br);

        let Bb = new T.Mesh(tPGeo, tMat)
        Bb.rotateY(2 * Math.PI / 2);
        Bb.translateZ(0.7502);
        base.add(Bb);

        let Bl = new T.Mesh(tPGeo, tMat)
        Bl.rotateY(3 * Math.PI / 2);
        Bl.translateZ(0.7502);
        base.add(Bl);

        //top texture
        let Tt = new T.TextureLoader().load("./Textures/glassTexture.jpg");
        let T2Mat = new T.MeshStandardMaterial({ map: Tt, color: "skyblue" })
        let t2Geo = new T.PlaneGeometry(1.3, 1.5);
        let Tf = new T.Mesh(t2Geo, T2Mat)
        Tf.translateZ(0.6502);
        top.add(Tf);

        let Tr = new T.Mesh(t2Geo, T2Mat)
        Tr.rotateY(Math.PI / 2);
        Tr.translateZ(0.6502);
        top.add(Tr);

        let Tb = new T.Mesh(t2Geo, T2Mat)
        Tb.rotateY(2 * Math.PI / 2);
        Tb.translateZ(0.6502);
        top.add(Tb);

        let Tl = new T.Mesh(t2Geo, T2Mat)
        Tl.rotateY(3 * Math.PI / 2);
        Tl.translateZ(0.6502);
        top.add(Tl);

        //lid texture
        let lt = new T.TextureLoader().load("./Textures/roofTexture.jpg");
        let lMat = new T.MeshStandardMaterial({ map: lt, color: "grey" });
        let lgeo = new T.PlaneGeometry(1.3, 1.3);
        let lid = new T.Mesh(lgeo, lMat);
        lid.rotateX(-Math.PI / 2);
        lid.translateZ(0.7502);
        top.add(lid);

        Building.translateY(-0.1);
        Building.translateX(x);
        Building.translateZ(z);
        Building.rotateY(theta);
        Building.scale.set(3, 5, 3);
        super(`Building-${buildingCtr++}`, Building);
    }
}

let roundaboutObCtr = 0;
// A colorful merry-go-round, with handles and differently-colored sections.
/**
 * @typedef ColoredRoundaboutProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrColoredRoundabout extends GrObject {
    /**
     * @param {ColoredRoundaboutProperties} params 
     */
    constructor(params = {}) {
        let roundabout = new T.Group();

        let base_geom = new T.CylinderGeometry(0.5, 1, 0.5, 16);
        let base_mat = new T.MeshStandardMaterial({ color: "#888888", metalness: 0.5, roughness: 0.8 });
        let base = new T.Mesh(base_geom, base_mat);
        base.translateY(0.25);
        roundabout.add(base);

        let platform_group = new T.Group();
        base.add(platform_group);
        platform_group.translateY(0.25);

        let section_geom = new T.CylinderGeometry(2, 1.8, 0.3, 8, 4, false, 0, Math.PI / 2);
        let section_mat;
        let section;

        let handle_geom = buildHandle();
        let handle_mat = new T.MeshStandardMaterial({ color: "#999999", metalness: 0.8, roughness: 0.2 });
        let handle;

        // in the loop below, we add four differently-colored sections, with handles,
        // all as part of the platform group.
        let section_colors = ["red", "blue", "yellow", "green"];
        for (let i = 0; i < section_colors.length; i++) {
            section_mat = new T.MeshStandardMaterial({ color: section_colors[i], metalness: 0.3, roughness: 0.6 });
            section = new T.Mesh(section_geom, section_mat);
            handle = new T.Mesh(handle_geom, handle_mat);
            section.add(handle);
            handle.rotation.set(0, Math.PI / 4, 0);
            handle.translateZ(1.5);
            platform_group.add(section);
            section.rotateY(i * Math.PI / 2);
        }

        // note that we have to make the Object3D before we can call
        // super and we have to call super before we can use this
        super(`Roundabout-${roundaboutObCtr++}`, roundabout);
        this.whole_ob = roundabout;
        this.platform = platform_group;

        // put the object in its place
        this.whole_ob.position.x = params.x ? Number(params.x) : 0;
        this.whole_ob.position.y = params.y ? Number(params.y) : 0;
        this.whole_ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 1;
        roundabout.scale.set(scale, scale, scale);

        this.advance = function (delta, timeOfDay) { this.platform.rotateY(0.005 * delta); }

        // This helper function defines a curve for the merry-go-round's handles,
        // then extrudes a tube along the curve to make the actual handle geometry.
        function buildHandle() {
            /**@type THREE.CurvePath */
            let handle_curve = new T.CurvePath();
            handle_curve.add(new T.LineCurve3(new T.Vector3(-0.5, 0, 0), new T.Vector3(-0.5, 0.8, 0)));
            handle_curve.add(new T.CubicBezierCurve3(new T.Vector3(-0.5, 0.8, 0), new T.Vector3(-0.5, 1, 0), new T.Vector3(0.5, 1, 0), new T.Vector3(0.5, 0.8, 0)));
            handle_curve.add(new T.LineCurve3(new T.Vector3(0.5, 0.8, 0), new T.Vector3(0.5, 0, 0)));
            return new T.TubeGeometry(handle_curve, 64, 0.1, 8);
        }
        this.rideable = this.whole_ob;
    }
}

export class Monument extends GrObject{
    constructor(x=0, z=0){
        let knot_Geom = new T.TorusKnotGeometry(1.5, 0.7, 32, 32, 2, 3);
        let envmap = new T.CubeTextureLoader()
        .setPath('./Textures/cityEnvMap/')
        .load([
            'lmcity_ft.png', 'lmcity_bk.png',
            'lmcity_up.png', 'lmcity_dn.png',
            'lmcity_rt.png', 'lmcity_lf.png'
        ]);
        let knot_Material = new T.MeshStandardMaterial({envMap:envmap, metalness:1, emissiveIntensity:0.3});
        let knot = new T.Mesh(knot_Geom, knot_Material);
        knot.position.set(x, 4, z);
        let base = new T.Mesh(new T.CylinderGeometry(2.5, 3, 1, 32, 32), new T.MeshStandardMaterial({color:"goldenrod"}));
        knot.add(base), 
        base.translateY(-3.2);
        super("Monument", knot);
    }
}