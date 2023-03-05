import base64

def decode(a):
    a = a+"==="
    base64_bytes = a.encode('ascii')
    message_bytes = base64.b64decode(base64_bytes)
    return message_bytes.decode('ascii')

text = open("text.txt","r",encoding="utf8").read()

heads = eval(open("heads.js","r",encoding="utf8").read().split("heads = ",1)[-1])

owners = ["LeoTheRavioli","instinct","RyanUwU","Runaiic","courteously","nsap","Runaiic","M-Seven","IllagerCaptain","DogeisCut","Panther","LeiCha","MadetheMeep","TB40","403_","Psjpoj","Torphedo","Morgan#9416","hyfae","sxci","Miasmus","InterestingUsername","PinkPanther1046","Kubajs70","iIFrozenFireIi","FleshlyIsTaken",
          "VisualCPlusPlus","SuicideMuffin","AceAxer","fleshly_","darkes","OperatorTheDope","GioVarquez","Nullmc",

"videogamesm12","Phleer","CaptainPatches","Captain Patches","fairygirl12","presidentkanst","shdwosx","VENOMFIONN","darkst.one"]

def save():
    savefile = open("heads.js","w",encoding="utf8")
    savefile.write(str(heads))
    savefile.close()

##text = open("foundheads.txt","r",encoding="utf8").read()
##for line in text.splitlines():
##    file = line.split(": ",1)[0]
##    name = line.split(": ",1)[1]
##    if not file in heads: heads[file] = name
##save()
##input()

##new = {}
##for line in text.splitlines():
##    if (not line in heads) and not line in new: new[line] = line.rsplit(".",1)[0]
##print(str(new).replace(", ",",\n"))
##input()

new = {}

normalnbt = '{textures: [{Value: "'
text = text.replace('{textures:[{Value:"',normalnbt).replace("{textures:[{Value:'",normalnbt).replace("{textures: [{Value:'",normalnbt)
for t in text.split('{textures: [{Value: "')[1:]:
    ownercheck = t.replace(", {Slot:",",{Slot:").split(",{Slot:",1)[0]
    namecheck = ownercheck
    ownercheck = ownercheck.lower()
    if "lanc3y" in ownercheck and "rookrar2k19" in ownercheck: owner = "Lanc3y and Rookrar2k19"
    elif "leo" in ownercheck and "ravioli" in ownercheck: owner = "LeoTheRavioli"
    else:
        owner = None
        for o in owners:
            if o.lower() in ownercheck:
                owner = o
                break
    encoded = t.split('"',1)[0]
    nbt = decode(encoded)
    if not "url" in nbt: continue
    url = nbt.replace('" :','":').replace(': "',':"').replace("url:",'"url":').split('"url":"',1)[1].split('"',1)[0]
    try: file = url.split("wp-content/uploads/",1)[1]
    except IndexError: continue#file = url.split("://",1)[1]
    if file in heads: continue
    #name = file.rsplit(".",1)[0]
    try:
        nametemp = namecheck.replace(",Name:'",',Name:"').split(',Name:"',1)[1]
    except: name = file.rsplit(".",1)[0]
    else:
        name = nametemp.replace("'}",'"}').split("\"",1)[0]
    if not owner == None: name = name+" ("+owner+")"
    new[file] = name
print(str(new).replace(", ",",\n"))
print(len(new))
#save()

