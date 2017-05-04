facil = ["hola", "dora","dama", "amor"]
medio = ["hacer","anexo","comer","Lente"]
dificil = ["sabana","fabula","hablan","quemar"]

function [] = menu() 

des = "a"
nivel = []
n = "f"
while(des <> "f")
disp("a) scramble word")
disp("b) change level")
disp("c) agregar palabra")
disp("d) mostrar lista")
disp("e) eliminar")
disp("f) salir")


if des == "a" then
if n == "f" then 
juegoF()
elseif n == "m" then 
juegoM()
elseif n == "d" then
juegoD()
end 
elseif des == "b" then
n = input("Seleciona nivel")
nivel = changeLevel(n)
elseif des == "c" then
n = input("entra nivel")
palabra = input("entra una palabra")
agregar(palabra,n)
elseif des == "d" then
show()
elseif des == "e" then

end

end

endfunction

function [nivel] = changeLevel(n)
if n == "f" then 
nivel = facil
elseif n == "m" then 
nivel = medio
elseif n == "d" then
nivel = dificil
end 
disp("Cambio de nivel")
endfunction 

function [] = show() 
disp("Facil")
disp(facil)
disp("Medio")
disp(medio)
disp("Dificil")
disp(dificil)

endfunction

function [] = agregar(palabra,n)
arreglo = [palabra]
if n == "f" then 
facil = cat(facil,arreglo)
elseif n == "m" then 
medio = cat(medio,arreglo)
elseif n == "d" then
dificil = cat(medio,arreglo)
end 
endfunction

function [] = juegoF()
ran = floor((rand*length(facil))+1)
palabra = facil[ran]
disp(strrev(palabra))
ans = input("la palabra es:")

if ans == palabra then 
disp("winner player")
else
disp("players fail")
endfunction
function [] = juegoM()
ran = floor((rand*length(medio))+1)
palabra = medio[ran]
disp(strrev(palabra))
ans = input("la palabra es:")

if ans == palabra then 
disp("winner player")
else
disp("players fail")

endfunction
function [] = juegoD()
ran = floor((rand*length(dificil))+1)
palabra = dificil[ran]
disp(strrev(palabra))
ans = input("la palabra es:")

if ans == palabra then 
disp("winner player")
else
disp("players fail")

endfunction