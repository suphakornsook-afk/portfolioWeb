import warrior1 from '../../../assets/rpg/warrior1.png';
import warrior2 from '../../../assets/rpg/warrior2.png';
import warrior3 from '../../../assets/rpg/warrior3.png';
import warrior4 from '../../../assets/rpg/warrior4.png';
import warrior5 from '../../../assets/rpg/warrior5.png';

import rogue1 from '../../../assets/rpg/rogue1.png';
import rogue2 from '../../../assets/rpg/rogue2.png';
import rogue3 from '../../../assets/rpg/rogue3.png';
import rogue4 from '../../../assets/rpg/rogue4.png';
import rogue5 from '../../../assets/rpg/rogue5.png';

export const WARRIOR_IMAGES = [warrior1, warrior2, warrior3, warrior4, warrior5];
export const ROGUE_IMAGES = [rogue1, rogue2, rogue3, rogue4, rogue5];

export const HERO_CONFIG = {
  warrior: {
    name: 'นักรบ (Warrior)',
    baseHp: 3000,
    baseAtk: 1200,
    hpGrowth: 1.0725,
    atkGrowth: 1.05
  },
  rogue: {
    name: 'จอมโจร (Rogue)',
    baseHp: 2000,
    baseAtk: 1600,
    hpGrowth: 1.05,
    atkGrowth: 1.075
  }
};

export const generateEnemy = (currentStage) => {
  const statPool = 800 + (currentStage * 300);
  const enemyType = Math.floor(Math.random() * 3); // 0=สายถึก, 1=สมดุล, 2=สายตีแรง
  
  let hpRatio, atkRatio, typeName;
  if (enemyType === 0) {
    typeName = 'ศิลาจอมถึก (สายถึก)'; hpRatio = 0.3; atkRatio = 0.45;
  } else if (enemyType === 2) {
    typeName = 'โกเลมระเบิดพลัง (สายตีแรง)'; hpRatio = 0.25; atkRatio = 0.75;
  } else {
    typeName = 'ปีศาจเงา (สายสมดุล)'; hpRatio = 0.5; atkRatio = 0.25;
  }

  const enemyMaxHp = Math.round(statPool * hpRatio * 2.5);
  const enemyAtk = Math.round(statPool * atkRatio);

  return {
    name: `ด่าน ${currentStage}: ${typeName}`,
    currentHp: enemyMaxHp,
    maxHp: enemyMaxHp,
    atk: enemyAtk
  };
};
