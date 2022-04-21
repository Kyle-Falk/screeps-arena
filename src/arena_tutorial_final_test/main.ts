// noinspection DuplicatedCode
import { getObjectsByPrototype, getTicks } from "game/utils";

import { hello } from "common/hello";
import { isFirstTick } from "common";
import {Creep, StructureSpawn} from "game/prototypes";
import {ATTACK, MOVE, WORK} from "game/constants";

let myCreeps: Creep[];
let enemyCreeps: Creep[];

export function loop(): void {
  if (isFirstTick()) {
    console.log(hello());
  }

  myCreeps = getObjectsByPrototype(Creep).filter(i => i.my);
  enemyCreeps = getObjectsByPrototype(Creep).filter(i => !i.my);

  // Notice how getTime is a global function, but not Game.time anymore
  if (getTicks() % 10 === 0) {
    console.log(`I have ${myCreeps.length} creeps`);
  }

  var mySpawn = getObjectsByPrototype(StructureSpawn)[0];

  if (myCreeps.length === 0) {
   var creep = mySpawn.spawnCreep([MOVE, WORK]).object;
  }



}
