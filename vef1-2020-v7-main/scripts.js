/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ ';

/**
 * Byrja forrit.
 */
function start() {
  
  let kodaEdaAfkoda=prompt('Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“');
     
    if(kodaEdaAfkoda==='kóða' || kodaEdaAfkoda==='afkóða'){
      const inntak=prompt('Gefðu upp heiltölu á bilinu [1, 31]');
      const heiltala=parseInt(inntak);
      
      if(heiltala<1 || heiltala>31){  
        alert(`${heiltala} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.`);
        start();
       }

      if(heiltala>1 || heiltala<31){
      const strengur = prompt('Gefðu upp strenginn sem á að kóða/afkóða með hliðrun');

        if(strengur===''){
          alert('Þú gafst ekki upp streng, reyndu aftur');
          start();
        }

        let i;
        let nonoStafir='';
        for(i=0; i<strengur.length; i++){
          if(!LETTERS.includes(strengur.charAt(i))){
            nonoStafir=nonoStafir.concat(strengur.charAt(i));
          }
        }
        if(nonoStafir!==''){
          alert(`Þú gafst upp stafi sem ekki er hægt að kóða: ${nonoStafir}. Stafirnir þurfa að vera hástafir. Reyndu aftur.`);
          start();
        }
        else if(kodaEdaAfkoda==='kóða'){
          alert(`Kóðaði strengurinn er: ${encode(strengur,heiltala)}`);
        }
        else if(kodaEdaAfkoda==='afkóða'){
          alert(`Afóðaði strengurinn er: ${decode(strengur,heiltala)}`);
        }
      }
    }
      else if(kodaEdaAfkoda==='afkóða'){
        
      }
      else{ 
         alert(`Veit ekki hvaða aðgerð „${kodaEdaAfkoda}“ er. Reyndu aftur.`);
         start();         
     }
      if(parseInt(inntak)<1 || parseInt(inntak)>31){  
       alert(`${heiltala} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.`);
       start();
      }  
 }
  

// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  let t;
  let kodaStrengur='';

  for(t=0;t<str.length;t++){
    let stafur=str.charAt(t);
    if(stafur===' '){
      kodaStrengur +=stafur;
      continue;
    }
    let stafaIndex=LETTERS.indexOf(stafur);
    let nyttIndex=stafaIndex+n;
    
    if(nyttIndex>31) {nyttIndex=nyttIndex-32}
    if(nyttIndex<0) {nyttIndex=nyttIndex+32}
    kodaStrengur += LETTERS.charAt(nyttIndex);
   
  }
  return kodaStrengur;
}


/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  let t;
  let kodaStrengur='';

  for(t=0;t<str.length;t++){
    let stafur=str.charAt(t);
    if(stafur===' '){
      kodaStrengur +=stafur;
      continue;
    }
    let stafaIndex=LETTERS.indexOf(stafur);
    let nyttIndex=stafaIndex-n;
    
    if(nyttIndex>31) {nyttIndex=nyttIndex-32}
    if(nyttIndex<0) {nyttIndex=nyttIndex+32}
    kodaStrengur += LETTERS.charAt(nyttIndex);
   
  }
  return kodaStrengur;
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
