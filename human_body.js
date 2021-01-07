document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function() {
        var scene = new BABYLON.Scene(engine);

        var ground = BABYLON.MeshBuilder.CreateGround("ground",{width:1,height:1}, scene);
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
        camera.setPosition(new BABYLON.Vector3(0, 0, 0));
        camera.radius = 500;
        camera.attachControl(canvas, true);


        var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var text1 = new BABYLON.GUI.TextBlock();
        text1.text = "Human Anatomy";
        text1.color = "white";
        text1.fontSize = 50;
        text1.left = -450;
        text1.top = -350;
        advancedTexture2.addControl(text1);

        var text2 = new BABYLON.GUI.TextBlock();
        text2.text = "Anatomy is the study of the inside of the body \n and outside the body. Anatomy notes the position \n and structure of organs such as muscles,\n glands and bones.";
        text2.color = "white";
        text2.fontSize = 22;
        text2.left = -450;
        text2.top = -260;
        advancedTexture2.addControl(text2);

        photoDome = new BABYLON.PhotoDome("testdome", "env7.jpg",  scene);

        scene.createDefaultLight();

        var scalingFactor2 = new BABYLON.Vector3(3, 3, 3);
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.3;

        BABYLON.SceneLoader.ImportMesh("", "male_basemesh/", "scene.gltf", scene,
            function(newMeshes){
                body = BABYLON.Mesh.MergeMeshes(newMeshes, true, true, null, false, true);
                body.scaling.multiplyInPlace(scalingFactor2);
                body.position.x = 0;
                body.position.y = 500;
                body.position.z = 0;
                body.wireframe = true;

            });
        var clicks = 0;
        var clicks1 = 0;
        var showScene = 0;
        var showScene1 = 0;
        var showScene2 = 0;
        var showScene3 = 0;
        var advancedTexture;
        // var but = "1";

        var createGUI = function(s1, s2, label, name, x, y, showScene) {
            switch (showScene) {
                case 0:
                    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, s1);
                    break;
                case 1:
                    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, s2);
                    break;
            }
            var button = BABYLON.GUI.Button.CreateSimpleButton(label, name);
            button.width = 0.2;
            button.height = "40px";
            button.color = "black";
            button.background = "white";
            button.left = x;
            button.top = y;
            advancedTexture.addControl(button);

            button.onPointerUpObservable.add(function () {
                clicks++;
                but = label;
            });


        };
        createGUI(scene, scene1, "1", "Human Muscle", 500, -350, showScene);
        createGUI(scene, scene2, "2", "Human Skeletal System", 500, -300, showScene1);
        createGUI(scene, scene3, "3", "Heart, valves, Auscultation Sites", 500, -250, showScene1);
        createGUI(scene, scene4, "4", "Human Digestive System", 500, -200, showScene);
        // createGUI(scene, scene1, "1", "Muscle", 500, -350, showScene);
        // createGUI(scene, scene2, "2", "Skeleton", 500, -300, showScene);
        var but = "4";
        engine.runRenderLoop(function () {
            // scene.remder();
            // createGUI(scene, scene2, "2", "Skeleton", 500, -300, showScene1);
            // createGUI(scene, scene1, "1", "Muscle3", 500, -350, showScene);
            // but = but % 2;
            if (but === "1"){
                scene1.render();
                if(showScene === (clicks % 2)){
                    showScene = clicks % 2;
                    switch (showScene) {
                        case 0:
                            advancedTexture.dispose();
                            createGUI(scene, scene1, "1","Muscle", 500, -350, showScene);
                            scene.render();
                            break;
                        case 1:
                            advancedTexture.dispose();
                            createGUI(scene1, scene, "1", "Back", 500, -350, showScene);
                            scene1.render();
                            break;
                    }
                }
            }
            if (but === "2"){
                scene2.render();
                if(showScene1 === (clicks % 2)){
                    showScene1 = clicks % 2;
                    switch (showScene1) {
                        case 0:
                            advancedTexture.dispose();
                            createGUI(scene, scene2, "2","Skeleton", 500, -300, showScene1);
                            scene.render();
                            break;
                        case 1:
                            advancedTexture.dispose();
                            createGUI(scene2, scene, "2", "Back", 500, -300, showScene1);
                            scene2.render();
                            break;
                    }
                }
            }
            if (but === "3"){
                scene3.render();
                if(showScene2 === (clicks % 2)){
                    showScene2 = clicks % 2;
                    switch (showScene2) {
                        case 0:
                            advancedTexture.dispose();
                            createGUI(scene, scene3, "3","Human Digestive System", 500, -250, showScene2);
                            scene.render();
                            break;
                        case 1:
                            advancedTexture.dispose();
                            createGUI(scene3, scene, "3", "back2", 500, -250, showScene2);
                            scene3.render();
                            break;
                    }
                }
            }
            if (but === "4"){
                scene4.render();
                if(showScene3 === (clicks % 2)){
                    showScene3 = clicks % 2;
                    switch (showScene3) {
                        case 0:
                            advancedTexture.dispose();
                            createGUI(scene, scene4, "4","Human Digestive System", 500, -200, showScene3);
                            scene.render();
                            break;
                        case 1:
                            advancedTexture.dispose();
                            createGUI(scene4, scene, "4", "back2", 500, -200, showScene3);
                            scene4.render();
                            break;
                    }
                }
            }
            // scene1.render();
            // if(showScene === (clicks % 2)){
            //     showScene = clicks % 2;
            //     switch (showScene) {
            //         case 0:
            //             advancedTexture.dispose();
            //             createGUI(scene, scene1, "1","Muscle", 500, -350, showScene);
            //             scene.render();
            //             break;
            //         case 1:
            //             advancedTexture.dispose();
            //             createGUI(scene1, scene, "1", "back", 500, -250, showScene);
            //             scene1.render();
            //             break;
            //     }
            // }
        }, 500);
        return scene;
    };
    const createScene1 = function () {
        const scene1 = new BABYLON.Scene(engine);
        var ground1 = BABYLON.MeshBuilder.CreateGround("ground1",{width:0.01,height:0.01}, scene1);
        var camera1 = new BABYLON.ArcRotateCamera("camera1", 1.8, 0, 0, new BABYLON.Vector3(0, 0, 0), scene1);
        camera1.setPosition(new BABYLON.Vector3(0, 0, 0));
        camera1.radius = 90;
        camera1.attachControl(canvas, true);

        photoDome = new BABYLON.PhotoDome("testdome1", "env7.jpg",  scene1);

        var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var text1 = new BABYLON.GUI.TextBlock();
        text1.text = "Human Muscle";
        text1.color = "white";
        text1.fontSize = 50;
        text1.left = -450;
        text1.top = -350;
        advancedTexture2.addControl(text1);

        var text2 = new BABYLON.GUI.TextBlock();
        text2.text = "Human muscle system, the muscles of the \n human body that work the skeletal system, \n that are under voluntary control, \n and that are concerned with movement,\n posture, and balance.";
        text2.color = "white";
        text2.fontSize = 22;
        text2.left = -450;
        text2.top = -250;
        advancedTexture2.addControl(text2);


        scene1.createDefaultLight();

        // var muscle = BABYLON.AbstractMesh;
        var scalingFactor2 = new BABYLON.Vector3(3, 3, 3);
        var light1 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, 1, 0), scene1);
        light1.intensity = 0.3;
        BABYLON.SceneLoader.ImportMesh("", "male_full_body_ecorche/", "scene.gltf", scene1,
            function(newMeshes){
                muscle = BABYLON.Mesh.MergeMeshes(newMeshes, true, true, null, false, true);
                camera1.target = newMeshes[0];
                muscle.scaling.multiplyInPlace(scalingFactor2);
                muscle.position.x = 0;
                muscle.position.y = 100;
                muscle.position.z = 0;
            });


        var clicks = 0;
        var showScene = 0;
        var advancedTexture;

        // var createGUI = function(scene1, showScene) {
        //     switch (showScene) {
        //         case 0:
        //             advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
        //             break;
        //         case 1:
        //             advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene1);
        //             break;
        //     }
        //     var button = BABYLON.GUI.Button.CreateSimpleButton("but", "Scene " + ((clicks + 1) % 2));
        //     button.width = 0.2;
        //     button.height = "40px";
        //     button.color = "white";
        //     button.background = "green";
        //     button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        //     advancedTexture.addControl(button);
        //
        //     button.onPointerUpObservable.add(function () {
        //         clicks++;
        //     });
        // };

        var createGUI = function(s1, s2, label, name, x, y, showScene) {
            switch (showScene) {
                case 0:
                    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, s1);
                    break;
                case 1:
                    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, s2);
                    break;
            }
            var button = BABYLON.GUI.Button.CreateSimpleButton(label, name);
            button.width = 0.2;
            button.height = "40px";
            button.color = "black";
            button.background = "white";
            button.left = x;
            button.top = y;
            advancedTexture.addControl(button);

            button.onPointerUpObservable.add(function () {
                clicks++;
            });
        };

        createGUI(scene1, scene, "1",  "back4", 500, -350, showScene);

        engine.runRenderLoop(function () {
            // scene.render();
            if(showScene !== (clicks % 2)){
                showScene = clicks % 2;
                switch (showScene) {
                    case 0:
                        advancedTexture.dispose();
                        createGUI(scene, scene1, "1","Muscle3", 500, -350, showScene);
                        scene.render();
                        break;
                    case 1:
                        advancedTexture.dispose();
                        createGUI(scene1, scene, "1","back3", 500, -350, showScene);
                        scene1.render();
                        break;
                }
            }
        }, 500);
        return scene1;
    };

    const createScene2 = function () {
        const scene2 = new BABYLON.Scene(engine);
        var ground1 = BABYLON.MeshBuilder.CreateGround("ground1",{width:0.01,height:0.01}, scene2);
        var camera2 = new BABYLON.ArcRotateCamera("camera1", 1.8, 1, 0, new BABYLON.Vector3(0, 0, 0), scene2);
        camera2.setPosition(new BABYLON.Vector3(0, 0, 0));
        camera2.radius = 3000;
        camera2.attachControl(canvas, true);

        var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var text1 = new BABYLON.GUI.TextBlock();
        text1.text = "Human Skeletal System";
        text1.color = "white";
        text1.fontSize = 50;
        text1.left = -430;
        text1.top = -350;
        advancedTexture2.addControl(text1);

        var text2 = new BABYLON.GUI.TextBlock();
        text2.text = "The skeletal system works as a \n support structure for your body. \n It gives the body its shape, allows movement,\n  makes blood cells, provides protection \n for organs and stores minerals. \n The skeletal system is also called \n the musculoskeletal system.";
        text2.color = "white";
        text2.fontSize = 22;
        text2.left = -450;
        text2.top = -200;
        advancedTexture2.addControl(text2);

        photoDome = new BABYLON.PhotoDome("testdome1", "env7.jpg",  scene2);


        scene2.createDefaultLight();


        var scalingFactor2 = new BABYLON.Vector3(3, 3, 3);
        var light3 = new BABYLON.HemisphericLight("light3", new BABYLON.Vector3(0, 1, 0), scene2);
        light3.intensity = 0.3;
        BABYLON.SceneLoader.ImportMesh("", "lymphatic_system/", "scene.gltf", scene2,
            function(newMeshes){
                flower2 = BABYLON.Mesh.MergeMeshes(newMeshes, true, true, null, false, true);
                camera1.target = newMeshes[0];
                flower2.scaling.multiplyInPlace(scalingFactor2);
                flower2.position.x = 0;
                flower2.position.y = 0;
                flower2.position.z = 0;
            });


        var clicks = 0;
        var showScene = 0;
        var advancedTexture;

        var createGUI = function(s1, s2, label, name, x, y, showScene) {
            switch (showScene) {
                case 0:
                    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, s1);
                    break;
                case 1:
                    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, s2);
                    break;
            }
            var button = BABYLON.GUI.Button.CreateSimpleButton(label, name);
            button.width = 0.2;
            button.height = "40px";
            button.color = "black";
            button.background = "white";
            button.left = x;
            button.top = y;
            advancedTexture.addControl(button);

            button.onPointerUpObservable.add(function () {
                clicks++;
            });
        };

        createGUI(scene2, scene, "2",  "Back4", 500, -300, showScene);

        engine.runRenderLoop(function () {
            // scene.render();
            if(showScene !== (clicks % 2)){
                showScene = clicks % 2;
                switch (showScene) {
                    case 0:
                        advancedTexture.dispose();
                        createGUI(scene, scene2, "2","Skeleton3", 500, -300, showScene);
                        scene.render();
                        break;
                    case 1:
                        advancedTexture.dispose();
                        createGUI(scene2, scene, "2","Back3", 500, -300, showScene);
                        scene2.render();
                        break;
                }
            }
        }, 500);
        return scene2;

    };

    const createScene3 = function () {
        const scene3 = new BABYLON.Scene(engine);
        var ground1 = BABYLON.MeshBuilder.CreateGround("ground1",{width:0.01,height:0.01}, scene3);
        var camera1 = new BABYLON.ArcRotateCamera("camera1", 1.8, 0, 0, new BABYLON.Vector3(0, 0, 0), scene3);
        camera1.setPosition(new BABYLON.Vector3(0, 0, 0));
        camera1.radius = 1100;
        camera1.attachControl(canvas, true);

        photoDome = new BABYLON.PhotoDome("testdome1", "env7.jpg",  scene3);

        var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var text1 = new BABYLON.GUI.TextBlock();
        text1.text = "Human Heart, Valves \n and Auscultation Sites";
        text1.color = "white";
        text1.fontSize = 50;
        text1.left = -450;
        text1.top = -350;
        advancedTexture2.addControl(text1);

        var text2 = new BABYLON.GUI.TextBlock();
        text2.text = "The heart is a muscular organ about the \n size of a fist, located just behind \n and slightly left of the breastbone. \n The heart pumps blood through the network \n of arteries and veins called the \n cardiovascular system.";
        text2.color = "white";
        text2.fontSize = 22;
        text2.left = -450;
        text2.top = -200;
        advancedTexture2.addControl(text2);


        scene3.createDefaultLight();

        // var muscle = BABYLON.AbstractMesh;
        var scalingFactor2 = new BABYLON.Vector3(3, 3, 3);
        var light1 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, 1, 0), scene3);
        light1.intensity = 0.3;
        BABYLON.SceneLoader.ImportMesh("", "heart/", "scene.gltf", scene3,
            function(newMeshes){
                muscle = BABYLON.Mesh.MergeMeshes(newMeshes, true, true, null, false, true);
                camera1.target = newMeshes[0];
                muscle.scaling.multiplyInPlace(scalingFactor2);
                muscle.position.x = 0;
                muscle.position.y = 100;
                muscle.position.z = 0;
            });


        var clicks = 0;
        var showScene = 0;
        var advancedTexture;

        var createGUI = function(s1, s2, label, name, x, y, showScene) {
            switch (showScene) {
                case 0:
                    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, s1);
                    break;
                case 1:
                    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, s2);
                    break;
            }
            var button = BABYLON.GUI.Button.CreateSimpleButton(label, name);
            button.width = 0.2;
            button.height = "40px";
            button.color = "black";
            button.background = "white";
            button.left = x;
            button.top = y;
            advancedTexture.addControl(button);

            button.onPointerUpObservable.add(function () {
                clicks++;
            });
        };

        createGUI(scene3, scene, "3",  "back", 500, -250, showScene);

        engine.runRenderLoop(function () {
            // scene.render();
            if(showScene !== (clicks % 2)){
                showScene = clicks % 2;
                switch (showScene) {
                    case 0:
                        advancedTexture.dispose();
                        createGUI(scene, scene3, "1","Muscle3", 500, -250, showScene);
                        scene.render();
                        break;
                    case 1:
                        advancedTexture.dispose();
                        createGUI(scene3, scene, "1","back3", 500, -250, showScene);
                        scene3.render();
                        break;
                }
            }
        }, 500);
        return scene3;
    };

    const createScene4 = function () {
        const scene4 = new BABYLON.Scene(engine);
        var ground1 = BABYLON.MeshBuilder.CreateGround("ground1",{width:0.01,height:0.01}, scene4);
        var camera1 = new BABYLON.ArcRotateCamera("camera1", 1.8, 0, 0, new BABYLON.Vector3(0, 0, 0), scene4);
        camera1.setPosition(new BABYLON.Vector3(0, 0, 0));
        camera1.radius = 1000;
        camera1.attachControl(canvas, true);

        photoDome = new BABYLON.PhotoDome("testdome1", "env7.jpg",  scene4);

        var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var text1 = new BABYLON.GUI.TextBlock();
        text1.text = "Human Digestive System";
        text1.color = "black";
        text1.fontSize = 50;
        text1.left = -430;
        text1.top = -350;
        advancedTexture2.addControl(text1);

        var text2 = new BABYLON.GUI.TextBlock();
        text2.text = "The human digestive system consists of \n the gastrointestinal tract plus \n the accessory organs of digestion. \n Digestion involves the breakdown of food \n into smaller and smaller components, \n  until they can be absorbed and assimilated \n into the body.";
        text2.color = "black";
        text2.fontSize = 22;
        text2.left = -450;
        text2.top = -220;
        advancedTexture2.addControl(text2);


        scene4.createDefaultLight();

        // var muscle = BABYLON.AbstractMesh;
        var scalingFactor2 = new BABYLON.Vector3(3, 3, 3);
        var light1 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, 1, 0), scene4);
        light1.intensity = 0.3;
        BABYLON.SceneLoader.ImportMesh("", "thorax/", "scene.gltf", scene4,
            function(newMeshes){
                muscle = BABYLON.Mesh.MergeMeshes(newMeshes, true, true, null, false, true);
                camera1.target = newMeshes[0];
                muscle.scaling.multiplyInPlace(scalingFactor2);
                muscle.position.x = 0;
                muscle.position.y = 100;
                muscle.position.z = 0;
            });


        var clicks = 0;
        var showScene = 0;
        var advancedTexture;

        var createGUI = function(s1, s2, label, name, x, y, showScene) {
            switch (showScene) {
                case 0:
                    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, s1);
                    break;
                case 1:
                    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, s2);
                    break;
            }
            var button = BABYLON.GUI.Button.CreateSimpleButton(label, name);
            button.width = 0.2;
            button.height = "40px";
            button.color = "black";
            button.background = "white";
            button.left = x;
            button.top = y;
            advancedTexture.addControl(button);

            button.onPointerUpObservable.add(function () {
                clicks++;
            });
        };

        createGUI(scene4, scene, "1",  "back", 500, -200, showScene);

        engine.runRenderLoop(function () {
            // scene.render();
            if(showScene !== (clicks % 2)){
                showScene = clicks % 2;
                switch (showScene) {
                    case 0:
                        advancedTexture.dispose();
                        createGUI(scene, scene4, "4","Human Digestive System", 500, -200, showScene);
                        scene.render();
                        break;
                    case 1:
                        advancedTexture.dispose();
                        createGUI(scene4, scene, "4","back", 500, -200, showScene);
                        scene4.render();
                        break;
                }
            }
        }, 500);
        return scene4;
    };


    var scene = createScene();
    var scene1 = createScene1();
    var scene2 = createScene2();
    var scene3 = createScene3();
    var scene4 = createScene4();
    // engine.runRenderLoop(function(){
    //     scene.render();
    //     scene1.render();
    // });

});
