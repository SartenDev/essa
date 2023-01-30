var iterator=0;



function zaokrongl(variable) {
    return Math.round(variable * 100) / 100;
}
document.addEventListener('mouseup', function(e) {
    if(e.target.id == "dwd"){
        zamknij();
    }
    else if(e.target.id == "dwd2"){
        zamknij1();
    }
});
function tableCreate2(splata, k, oprocentowanie, kwota, rata, prowizja, kwota_dodana,ubezpieczenie) {
    //tu sie dzieje magia sztańska i wgl ale no uwu
    var a = document.getElementById("wyniki2");
    // czyszczenie diva
    a.innerHTML = '';
    //ustawiamy sobie stałą
    const wyniki = document.a,
    // do tej stałej tworzymy element div
    div = document.createElement('div');
    // ustawiamy id diva jako tabela
    div.setAttribute("id", "tabela");
    //tworzymy tabele
    tbl = document.createElement('table');
    // dopisujemy tabele do diva
    div.appendChild(tbl);
    tbl.style.width = '70vw';
    tbl.style.border = '1px solid black';
    var Roznica=0;
    var odsetki = 0,   suma_odsetek = 0,    suma = 0 ,      suma_kapitalu = 0, OstatniaRata = 0;
    var rata_kapital = 0,   suma = 0,       kwota_kredytu=kwota, kapital = 0;
    var BalansPrzedNaplata = rata * splata;
    var element1 = document.getElementById('advanced2');
    var choice2 = document.getElementsByName('choice2');
    var OdsetkiPrzedNadplata = zaokrongl(BalansPrzedNaplata-kwota);
    var KwotaDoSplatyPoNadplacie = 0;
    console.log(OdsetkiPrzedNadplata)
    //var element1 = document.getElementById('advanced2');
    //var choice2 = document.getElementsByName('choice2');
    //if(element1!==null && choice2[1].checked==true){
    //    console.log("Kwota: 1 " +  kwota);
    //    kwota_kredytu= kwota - kwota_dodana;
    //    console.log("kwota+kredytu: " + kwota_kredytu)
    //}
    //else{
    //    kwota_kredytu = kwota;
    //    console.log("Kwota: 1 " +  kwota);
    //
    //    console.log("kwota+kredytu: " + kwota_kredytu)
    //}
    
    
    // prosta pętla myśle że nic nie trzeba tłumaczyć
    loop1:
        for (let i = 0; i <= splata; i++) {
            const tr = tbl.insertRow();
            odsetki = (oprocentowanie / k) * kwota_kredytu;
                console.log("Odsteki: "+i + " + " + odsetki)
                rata_kapital = rata - odsetki;
            loop2:
            for (let j = 0; j < 5; j++) {

                const td = tr.insertCell();
                td.style.border = '1px solid black';
                if (i == 0 && j == 0) {
                    td.appendChild(document.createTextNode("L.p."));
                    td.style.fontSize = '17px';
                } else if (i == 0 && j == 1){
                    td.appendChild(document.createTextNode("Kapitał"));
                    td.style.fontSize = '17px';
                } else if (i == 0 && j == 2) {
                    td.appendChild(document.createTextNode("Odsetki"));
                    td.style.fontSize = '17px';
                } else if (i == 0 && j == 3) {
                    td.appendChild(document.createTextNode("raty kapitałowe"));
                    td.style.fontSize = '17px';
                } else if (i == 0 && j == 4) {
                    td.appendChild(document.createTextNode("Wysokość raty"));
                    td.style.fontSize = '17px';
                } 
                if (j == 0 && i != 0) {
                    if(rata_kapital>=rata){
                        td.parentNode.removeChild(td);
                        break loop1;
                    }
                    td.appendChild(document.createTextNode(i));
                }else if(j == 1 && i == 1){
                    
                    
                    td.appendChild(document.createTextNode(kwota_kredytu));
                    if(element1!==null && choice2[1].checked==true){
                        kwota_kredytu-=rata_kapital;
                        kwota_kredytu= kwota - kwota_dodana;
                        rata_kapital = rata - odsetki;
                    }
                    else if(element1!==null && choice2[0].checked==true){
                        kwota_kredytu -= kwota_dodana;
                        
                        // tutaj jest licznik podzielony przez mianownik
                    }

                    console.log("kwota: " + kwota) ;
                    console.log("kwota dodana: " + kwota_dodana) ;
                    //kwota -= kwota_dodana;
                } else if (j == 1 && i != 0) {
                    /// kapitał
                    console.log("iterator  " + iterator)
                    if(element1!==null &&i==iterator && choice2[1].checked==true){
                        //td.style.border = '2px solid red';
                    }
                    
                    td.appendChild(document.createTextNode(zaokrongl(kwota_kredytu)));
                } else if (j == 2 && i != 0) {
                    suma_odsetek += odsetki;
                    
                    
                    td.appendChild(document.createTextNode(zaokrongl(odsetki)));
                } else if (j == 3 && i != 0) {
                    if(element1!==null && i==iterator && choice2[1].checked==true){
                        Roznica = OdsetkiPrzedNadplata-suma_odsetek;
                        KwotaDoSplatyPoNadplacie = zaokrongl(BalansPrzedNaplata-Roznica)
                        document.getElementById("wyniki").innerHTML = "Wysokość raty: " + zaokrongl(rata) + "<br>"
                        rata = KwotaDoSplatyPoNadplacie - (rata*(i-1)) - kwota_dodana;
                        rata_kapital = rata-odsetki;
                        document.getElementById("wyniki").innerHTML += "Całkowita kwota do spłaty: " + zaokrongl(KwotaDoSplatyPoNadplacie);
                    }
                    else if(element1!==null && i>1 &&choice2[0].checked==true){
                        //rata = 	721.89;
                        //rata_kapital = rata-odsetki;
                    }

                    kwota_kredytu -= rata_kapital;
                    td.appendChild(document.createTextNode(zaokrongl(rata_kapital)));
                } else if (j == 4 && i != 0) {
                    td.appendChild(document.createTextNode(zaokrongl(rata)));
                }
                
            }
        }
        console.log("suma odsetek: " + suma_odsetek)
        console.log("Roznica: " + Roznica)
        
        console.log("KwotaDoSplatyPoNadplacie " + KwotaDoSplatyPoNadplacie)
    a.appendChild(div);
}
function obliczanie(I,N,oprocentowanie,choice,n,zaplata,prowizja,suma,k,kwota_dodana,ubezpieczenie){
    var choice2 = document.getElementsByName('choice2');
    var advanced = document.getElementById('advanced2');
        // jeżeli wybrane żeby Prowizja wliczana w koszt kredytu to wtedy to się liczy
        if (choice[0].checked == true) {
            prowizja = (document.getElementById("prowiz").value) / 100;

            prowizja = prowizja * N;
            console.log("Prowizja : " + prowizja)
            // doliczamy prowizję do kwoty kredytu
            N = N * 1 + prowizja* 1;
            
            //if(advanced!==null && choice2[0].checked==true){
            //    N -= kwota_dodana; 
            //}
            
            
            // jeżeli okres spłaty wynosi mniej niż 12 miesięcy to analogicznie w roku 
            // zapłacimy równowartość tego okresu bo w roku mamy max 12 rat
            k = 12;
            if (n < 12) {
                k = n;
            }
            for (var i = 1; i <= n; i++) {
                // no to tutaj przepisany wzór z matematycznego na kodowanie 
                suma += Math.pow((1 + (oprocentowanie / k)), -i);
            }
            // tutaj jest licznik podzielony przez mianownik
            I = N / suma;
            // mnożymy naszą ratę razy ilość rat aby otrzymać ile będziemy musieli oddać bankowi
            zaplata = I * n;
            if(advanced !== null && choice2[1].checked == true){
                /// dzikie testowanie  //
                /////////////////////////
               var odsetki=0, kapital=0, kwota_kredytu, suma=0;
               kwota_kredytu= N - kwota_dodana;
               
               for(iterator=0;iterator<n;iterator++){
                   odsetki = (oprocentowanie / k) * kwota_kredytu;
                   kapital = I - odsetki;
                   kwota_kredytu -= kapital;
                   if(kapital>=I){
                       break;
                   }
               }
            
               zaplata = I * iterator + kwota_dodana;

               console.log("////////////////////////////////")
               console.log("rata: " + I)
               console.log("pieniondze: " + N);
               console.log("////////////////////////////////")
            }
            if(advanced !== null && choice2[0].checked==true){
                console.log("zaplata: " +zaplata);
                console.log("kwota dodana: " +kwota_dodana);
                //zaplata+=kwota_dodana;
                console.log(zaplata)
            }

            document.getElementById("wyniki").innerHTML = "Wysokość raty: " + zaokrongl(I) + "<br>" +
                "Całkowita kwota do spłaty: " + zaokrongl(zaplata);
            //N=N*1+kwota_dodana;
            console.log("N: " + N)
            tableCreate2(n, k, oprocentowanie, N, zaokrongl(I), prowizja,kwota_dodana,ubezpieczenie)
            

        // jeżeli wybrane żeby Prowizja wliczana osobno to wtedy to się liczy
        } else if (choice[1].checked == true) {
            prowizja = (document.getElementById("prowiz").value) / 100;
            prowizja = prowizja * N;
            //if(advanced !== null && choice2[0].checked==true){
            //    N -= kwota_dodana; 
            //}
            
            // jeżeli okres spłaty wynosi mniej niż 12 miesięcy to analogicznie w roku zapłacimy równowartość tego okresu bo w roku mamy max 12 rat
            k = 12;
            if (n < 12) {
                k = n;
            }
            for (var i = 1; i <= n; i++) {
                // no to tutaj przepisany wzór z matematycznego na kodowanie 
                suma += Math.pow((1 + (oprocentowanie / k)), -i);
            }
            // tutaj jest licznik podzielony przez mianownik
            I = N / suma;
            // mnożymy naszą ratę razy ilość rat aby otrzymać ile będziemy musieli oddać bankowi
            zaplata = I * n;
            // doliczamy prowizję po wszystkich obliczeniach
            zaplata = zaplata + prowizja;
            if(advanced !== null && choice2[1].checked == true){
                /// dzikie testowanie  //
                /////////////////////////
               var odsetki=0, kapital=0, kwota_kredytu, suma=0;
               kwota_kredytu= N - kwota_dodana;
               
               for(iterator=0;iterator<n;iterator++){
                   odsetki = (oprocentowanie / k) * kwota_kredytu;
                   kapital = I - odsetki;
                   kwota_kredytu -= kapital;
                   if(kapital>=I){
                       break;
                   }
               }
            
               zaplata = I * iterator + kwota_dodana;

               console.log("////////////////////////////////")
               console.log("rata: " + I)
               console.log("pieniondze: " + N);
               console.log("////////////////////////////////")
            }
            if(advanced !== null && choice2[0].checked==true){
                console.log("zaplata: " +zaplata);
                console.log("kwota dodana: " +kwota_dodana);
                //zaplata+=kwota_dodana;
                console.log(zaplata)
            }
            document.getElementById("wyniki").innerHTML = "Wysokość raty: " + zaokrongl(I) + "<br>" +
                "Całkowita kwota do spłaty: " + zaokrongl(zaplata);
            console.log("N: " + N)
            tableCreate2(n, k, oprocentowanie, N, zaokrongl(I), prowizja,kwota_dodana,ubezpieczenie)
            
        }
        else{
            console.log("wda")
        }
        document.getElementById("dwd").style.backdropFilter = "blur(7px)";
        document.getElementById("wyniki").innerHTML += "<br><input type=\"button\" id='guzior1' onclick=\"pokaz()\" value=\"pokaż harmonogram rat\">";
    
}
function test() {
    
    document.getElementById("wyniki").style.visibility = "visible"; // a to to nwm pan mularczyk robił
    var I, N, oprocentowanie, k, n, suma = 0, zaplata, prowizja = 0;
    
    N = parseFloat(document.getElementById("kwota").value); // kwota kredytu
    oprocentowanie = parseFloat(document.getElementById("oproc").value/100); // oprocentowanie kredytu
    n = parseFloat(document.getElementById("splata").value); // okres splaty

    var choice = document.getElementsByName('choice');
    if(N == 696969 && n==420 && oprocentowanie==0.69){
        pokaz2();
        audio1.play();
    }
    //////////////////////////////////////
    //                                  //
    // sprawdzenie czy jest rozwinięte  //
    //                                  //
    //////////////////////////////////////

    var element1 = document.getElementById('advanced2');
    var element2 = document.getElementById('advanced2');
    if(element1 !== null  && element2 !== null){
        var ubezpieczenie = parseFloat(document.getElementById("ubezpieczenie").value);
        var kwota_dodana = parseFloat(document.getElementById("kwotaDodana").value);
        var choice2 = document.getElementsByName('choice2'); // zaawansowane
        if(choice2[0].checked == true){
            console.log(kwota_dodana + "  " + "tyle samo rat ale mniejsza cena")
            //////////////////////////////////////////
            //                                      //
            //    tyle samo rat ale mniejsza cena   //
            //                                      //
            //////////////////////////////////////////
            
            console.log("Nigger: " + N)
            obliczanie(I,N,oprocentowanie,choice,n,zaplata,prowizja,suma,k,kwota_dodana,ubezpieczenie);
            
        }
        if(choice2[1].checked == true){
            console.log(kwota_dodana + "  " + "Mniej rat, po tej samej cenie raty")
            //////////////////////////////////////////
            //                                      //
            //  Mniej rat, po tej samej cenie raty  //
            //                                      //
            //////////////////////////////////////////

            
            obliczanie(I,N,oprocentowanie,choice,n,zaplata,prowizja,suma,k,kwota_dodana,ubezpieczenie);
        }
        

    }
    else{
        obliczanie(I,N,oprocentowanie,choice,n,zaplata,prowizja,suma,k,0);
    }
    
}
function pokaz() {
    document.getElementById("dwd").style.visibility = "visible";
}

function zamknij() {
    document.getElementById("dwd").style.visibility = "hidden";
}
function pokaz1() {
    document.getElementById("dwd2").style.backdropFilter = "blur(7px)";
    document.getElementById("dwd2").style.visibility = "visible";
}

function zamknij1() {
    document.getElementById("dwd2").style.visibility = "hidden";
}
function pokaz2() {
    audio.pause()
    document.getElementById("dwd3").style.backdropFilter = "blur(7px)";
    document.getElementById("dwd3").style.visibility = "visible";
}

function zamknij2() {
    audio1.pause()
    audio.play();
    document.getElementById("dwd3").style.visibility = "hidden";
}
function zaawansowane(){
    var element = document.getElementById('advanced2');
    if(element === null){
        var a = document.getElementById("gl");
        const wyniki = document.a,
        /////////////////////////////////////////
        //                                     //
        //          input text kwata           //
        //                                     //
        ///////////////////////////////////////// 
        advanced2 = document.createElement('div');
        advanced2.setAttribute('id','advanced2');

        divD8 = document.createElement('div');
        divD8.setAttribute('id','d8');
        divD8.setAttribute('class','d');

        TextKwotaDolozona = document.createElement('div');
        divD8.innerHTML = 'Kwota dołożona';
        divD8.appendChild(TextKwotaDolozona);

        InputKwotaDodana = document.createElement('input');
        InputKwotaDodana.setAttribute('type','text');
        InputKwotaDodana.setAttribute('name','kwotaDodana');
        InputKwotaDodana.setAttribute('id','kwotaDodana');
        InputKwotaDodana.setAttribute('pattern','[0-9]');
        InputKwotaDodana.setAttribute('class','wej');
        InputKwotaDodana.setAttribute('value','5000');
        divD8.appendChild(InputKwotaDodana);


        divD9 = document.createElement('div');
        divD9.setAttribute('id','d9');
        divD9.setAttribute('class','d');

        TextKwotaDolozona = document.createElement('div');
        TextKwotaDolozona.innerHTML = 'Ubezpieczenie';
        divD9.appendChild(TextKwotaDolozona);

        InputKwotaDodana = document.createElement('input');
        InputKwotaDodana.setAttribute('type','text');
        InputKwotaDodana.setAttribute('name','ubezpieczenie');
        InputKwotaDodana.setAttribute('id','ubezpieczenie');
        InputKwotaDodana.setAttribute('pattern','[0-9]');
        InputKwotaDodana.setAttribute('class','wej');
        InputKwotaDodana.setAttribute('value','0');
        divD9.appendChild(InputKwotaDodana);
        
        

        /////////////////////////////////////////
        //                                     //
        //            inputy radio             //
        //                                     //
        /////////////////////////////////////////                                          

        divD10 = document.createElement('div');
        divD10.setAttribute('id','d10');
        divD10.setAttribute('class','dradio');

        label1 = document.createElement('label');
        label1.setAttribute('class','l1');

        inputRadio1 = document.createElement('input');
        inputRadio1.setAttribute('type','radio');
        inputRadio1.setAttribute('name','choice2');
        inputRadio1.setAttribute('class','radio');
        inputRadio1.setAttribute('value','rat_tyle_samo');
        inputRadio1.setAttribute('checked',"true");
        
        //label1.appendChild(inputRadio1);
        
        
        label1.appendChild(inputRadio1)
        label1.innerHTML += 'Mniejsza rata na taki sam okres czasu';

        label2 = document.createElement('label');
        label2.setAttribute('class','l2');

        inputRadio2 = document.createElement('input');
        inputRadio2.setAttribute('type','radio');
        inputRadio2.setAttribute('name','choice2');
        inputRadio2.setAttribute('class','radio');
        inputRadio2.setAttribute('value','rat_mniej');
        
        //label1.appendChild(inputRadio1);
        
        
        label2.appendChild(inputRadio1)
        label2.innerHTML += 'Raty pozostają takie same, ale mniej';

        divD10.appendChild(label1)
        divD10.appendChild(label2)



        advanced2.appendChild(divD8)
        advanced2.appendChild(divD9)
        advanced2.appendChild(divD10)
        a.appendChild(advanced2)
        
        clicked = false;
    }
    else{
        var elem = document.getElementById("advanced2");
        elem.parentNode.removeChild(elem);
    }
}