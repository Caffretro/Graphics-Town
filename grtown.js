/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 * 
 * This is the main file - it creates the world, populates it with 
 * objects and behaviors, and starts things running
 * 
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 * 
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

import { GrWorld } from "./Framework/GrWorld.js";
import {GrObject } from "./Framework/GrObject.js";  // only for typing
import * as Helpers from "./Libs/helpers.js";
import { WorldUI } from "./Framework/WorldUI.js";

/** These imports are for the examples - feel free to remove them */
import {SimpleHouse} from "./Examples/house.js";
import {CircularTrack, TrackCube, TrackCar} from "./Examples/track.js";
import {Helicopter, Helipad} from "./Examples/helicopter.js";
import {GrCarousel, Truck, Human, Drone, carTrack, GrSpinner, GrForkLift, Church, Road, House, Building, GrColoredRoundabout, Concrete, Monument} from "./objectCollection.js";
import {flag, rain, Crane, Breaker, Tree} from "./constructionCollection.js";
import {Morpher, ShinyMonument, RadarMap} from "./advanceCollection.js";
/**
 * The Graphics Town Main - 
 * This builds up the world and makes it go...
 */
function grtown() {
    // make the world
    let world = new GrWorld({
        width:1000, height:600,         // make the window reasonably large
        groundplanesize:40,           // make the ground plane big enough for a world of stuff
        ambient:1
    });
    world.scene.background = new T.CubeTextureLoader()
        .setPath('./Textures/cityEnvMap/')
        .load([
            'lmcity_ft.png', 'lmcity_bk.png',
            'lmcity_up.png', 'lmcity_dn.png',
            'lmcity_rt.png', 'lmcity_lf.png'
        ]);

    // put stuff into it - you probably want to take the example stuff out first


    /********************************************************************** */
    /** EXAMPLES - student should remove these and put their own things in  */
    /***/
    // make two rows of houses, mainly to give something to look at
    // for(let i=-19; i<20; i+=5) {
    //     world.add(new SimpleHouse({x:i, z:-12}));
    //     world.add(new SimpleHouse({x:i, z: 12}));
    // }

    /** Race Track - with three things racing around */
    // let track = new CircularTrack();
    // let tc1 = new TrackCube(track);
    // let tc2 = new TrackCube(track);
    // let tc3 = new TrackCar(track);
    // // place things are different points on the track
    // tc2.u = 0.25;
    // tc3.u = 0.125;
    // // and make sure they are in the world
    // world.add(track);
    // world.add(tc1);
    // world.add(tc2);
    // world.add(tc3);

    // /** Helicopter - first make places for it to land*/
    // world.add(new Helipad(-15,0,0));
    // world.add(new Helipad(15,0,0));
    // world.add(new Helipad(0,0,-17));
    // world.add(new Helipad(0,0,17));
    // let copter = new Helicopter();
    // world.add(copter);
    // copter.getPads(world.objects);


    // Loading files
    // let loader = new T.OBJLoader();
    // /**@type{THREE.Object3D} */
    // let treeGroup;
    // loader.load("./Objects/tree.obj", (tree) => {
    //     treeGroup = tree;
    //     world.scene.add(treeGroup);
    // });

    


    /** EXAMPLES - end - things after this should stay                      */
    /********************************************************************** */

    // Render to Textureing - billboard
    let cam2 = new T.PerspectiveCamera(22, world.renderer.domElement.width / world.renderer.domElement.height, 0.1, 2000);
    cam2.position.set(0, 30, 0);

    let bufferTexture = new T.WebGLRenderTarget(world.renderer.domElement.width, world.renderer.domElement.height, { minFilter: T.LinearFilter, magFilter: T.NearestFilter });
    let billboard_Geom = new T.PlaneGeometry(8, 4.5);
    let billboard_Material = new T.MeshStandardMaterial({ metalness: 0, map: bufferTexture.texture, side: T.DoubleSide})
    let billboard_Mesh = new T.Mesh(billboard_Geom, billboard_Material);
    billboard_Mesh.position.set(-22, 7, -8);
    billboard_Mesh.rotateY(Math.PI / 8)
    let billboard = new GrObject("billboard", billboard_Mesh);
    let rod_Geom = new T.CylinderGeometry(0.5, 0.5, 10, 4, 10, false);
    let rod_Material = new T.MeshStandardMaterial({color:"silver"});
    let rod1 = new T.Mesh(rod_Geom, rod_Material);
    let rod2 = new T.Mesh(rod_Geom, rod_Material);
    billboard_Mesh.add(rod1, rod2);
    rod1.translateX(4.5);
    rod2.translateX(-4.5);
    rod1.translateY(-2);
    rod2.translateY(-2);
    let time = 0;
    billboard.advance = function(delta, timeOfDay){
        time += delta / 2000;
        cam2.position.x = 50 * Math.sin(Math.PI * time);
        cam2.position.z = 50 * Math.cos(Math.PI * time);
        cam2.lookAt(new T.Vector3(0, 0, 0));
        // cam2.rotateOnWorldAxis(new T.Vector3(0, 1, 0), performance.now() % 1200 * 0.0002);
        world.renderer.render(world.scene, cam2, bufferTexture);
    }
    world.add(billboard);

    // looping car & drone & all middle part
    let truck1 = new Truck({ x: 0, z: 10, size: 1 });
    world.add(truck1);
    world.add(new carTrack());
    let drone = new Drone();
    world.add(drone);
    world.add(new rain());
    let road1 = new Road(30);
    world.add(road1);
    let road2 = new Road(30, 0, Math.PI / 2, -0.1);
    world.add(road2);

    // Park part
    let carousel = new GrCarousel({ x: -10, z: 10, size: 1 });
    world.add(carousel);
    for (let i = 0; i < 2; i++){
        world.add(new Human(-15 - i * 4, 20 - i * 2, 10, 10));
        world.add(new Human(5 + i * 3,-1 + i * 2, 20, 40, true));
    }
    world.add(new Monument(-12, 25));

    let spinner = new GrSpinner({x: -15, y: 0, z: 15, size: 1});
    world.add(spinner);
    world.add(new GrColoredRoundabout({x:-18, z: 10}));
    
    // Construction part
    let forkLift = new GrForkLift({x: 10, y: 0, z: 10, size:1});
    world.add(forkLift);
    world.add(new Concrete(5, 10));
    world.add(new Concrete(7, 14));
    world.add(new Crane({ x: 10, y: 0, z: 20, size: 2 }));
    world.add(new Breaker({ x: 17, z: 20 }));
    world.add(new Building(26, 20));
    world.add(new SimpleHouse({ x: 25, z: 10 }));

    // Church part
    world.add(new flag());
    let church = new Church(-20, -20, Math.PI / 4);
    world.add(church);
    
    // Living area
    for (let i = 0; i < 2; i++){
        world.add(new House(11 + 10 * i, -7));
        world.add(new SimpleHouse({ x: 5 + 10 * i, z: -7 }));
        world.add(new House(11 + 10 * i, -15));
        world.add(new SimpleHouse({ x: 5 + 10 * i, z: -15 }));
    }
    world.add(new Building(10, -24));
    world.add(new Building(20, -24));
    
    // And trees
    for (let i = 1; i < 5; i++) {
        if (i % 2 == 1) {
            world.add(new Tree(-3, 3 + 5 * i));
            world.add(new Tree(-3, -3 - 5 * i));
            world.add(new Tree(-3 - 5 * i, 3));
            world.add(new Tree(-3 - 5 * i, -3));
            world.add(new Tree(3, 3 + 5 * i));
            world.add(new Tree(3, -3 - 5 * i));
            world.add(new Tree(3 + 5 * i, 3));
            world.add(new Tree(3 + 5 * i, -3));
        } else {
            world.add(new Tree(-3, 3 + 5 * i, 1.5));
            world.add(new Tree(-3, -3 - 5 * i, 1.5));
            world.add(new Tree(-3 - 5 * i, 3, 1.5));
            world.add(new Tree(-3 - 5 * i, -3, 1.5));
            world.add(new Tree(3, 3 + 5 * i, 1.5));
            world.add(new Tree(3, -3 - 5 * i, 1.5));
            world.add(new Tree(3 + 5 * i, 3, 1.5));
            world.add(new Tree(3 + 5 * i, -3, 1.5));
        }

    }
    
    // Advance parts
    // world.add(new ShinyMonument(-24, 14, world));
    world.add(new RadarMap(0, -28));

    // build and run the UI

    // only after all the objects exist can we build the UI
    // @ts-ignore       // we're sticking a new thing into the world
    world.ui = new WorldUI(world);
    // now make it go!
    world.go();
}
Helpers.onWindowOnload(grtown);