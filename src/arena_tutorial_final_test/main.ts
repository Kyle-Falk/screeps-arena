// noinspection DuplicatedCode
import { getObjectsByPrototype, getTicks } from "game/utils";

import { hello } from "common/hello";
import { isFirstTick } from "common";
import {Creep, StructureSpawn, Source} from "game/prototypes";
import {ATTACK, CARRY, ERR_NOT_IN_RANGE, HEAL, MOVE, RANGED_ATTACK, RESOURCE_ENERGY, WORK} from "game/constants";

let myCreeps: Creep[];
let enemyCreeps: Creep[];
let mySpawn: StructureSpawn;
let workerCreepCount = 0;
let attackerCreepCount = 0;
let source: Source;

export function loop(): void {
  if (isFirstTick()) {
    console.log(hello());
  }


  source = getObjectsByPrototype(Source)[0];
  myCreeps = getObjectsByPrototype(Creep).filter(i => i.my);
  enemyCreeps = getObjectsByPrototype(Creep).filter(i => !i.my);
  mySpawn = getObjectsByPrototype(StructureSpawn)[0];

  let spawnEnergy = mySpawn.store[RESOURCE_ENERGY];

  if (workerCreepCount == 0) {
   mySpawn.spawnCreep([MOVE, WORK, CARRY]).object;
   workerCreepCount ++;
  } else {
    if (spawnEnergy >= 130) {
      mySpawn.spawnCreep([ATTACK, MOVE]).object;
      attackerCreepCount++;
    }
  }

  // Run all my creeps according to their bodies
  myCreeps.forEach(creep => {

    if (creep.body.some(i => i.type == WORK)) {
       workerCreep(creep);
    }

    if (creep.body.some(i => i.type == ATTACK)) {
      attackerCreep(creep);
    }
  });
}

function attackerCreep(creep: Creep) {
  if (creep.attack(enemyCreeps[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(enemyCreeps[0]);
  }
}

function workerCreep(creep: Creep) {
  let energyCapacity = creep.store[RESOURCE_ENERGY];
  if (energyCapacity < 50) {
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
      }
  } else {
    if (creep.transfer(mySpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(mySpawn);
    }
  }
}
