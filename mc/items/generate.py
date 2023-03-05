def splitlines(file="text.txt"): return open(file,"r",encoding="utf8").read().splitlines()
def makefile(content="",file="generated.txt"):
    savefile = open(file,"w",encoding="utf8")
    savefile.write(content)
    savefile.close()
def idtoname(a): return a.replace("_"," ").title().replace("Tnt","TNT")

def spawners():
    l = []
    for entity in splitlines("ids/entities.txt"):
        l.append('give @p minecraft:spawner{display:{Name:\'{"text":"Spawner ('+idtoname(entity)+')","italic":false}\'},BlockEntityTag:{SpawnData:{id:"minecraft:'+entity+'"}}} 1')
    makefile("\n".join(l))
def splitpotionids():
    l = []
    for line in splitlines(): l.append(line.split("\t",2)[2].split("\t",1)[0])
    makefile("\n".join(l))
def potions():
    l = []
    for potion in splitlines("ids/potions.txt"):
        l.append('give @p minecraft:potion{Potion:"minecraft:'+potion+'",display:{Name:\'{"text":"'+idtoname(potion)+' Potion","italic":false}\'}} 1')
    makefile("\n".join(l))
def lootchests():
    l = []
    for loot in splitlines("ids/loot_chests.txt"):
        l.append('give @p minecraft:chest{display:{Name:\'{"text":"Loot Chest ('+idtoname(loot)+')","italic":false}\'},BlockEntityTag:{LootTable:"chests/'+loot+'"}} 1')
    makefile("\n".join(l))
