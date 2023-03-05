while True:
    command = input("Command: ")
#    command = "many"
    if command == "many":
        commands = open("commands.txt","r",encoding="utf8").read().splitlines()
    else: commands = [command]
    for command in commands:
        if len(command.split()) == 0 or command.startswith("#"): continue
#        command = command.split('\\"}"}}',1)[0]+" Leather Boots"+'\\"}",\\"italic\\":false}} 1'
        name = None
        if command.endswith("*"):
            command = command[:-1]
            name = input(command+"\nName: ")
            if len(name.split()) == 0: name = None
        if not name == None: pass
        elif 'Name:"{\\"text\\":\\"' in command:
            name = command.rsplit('Name:"{\\"text\\":\\"',1)[1].split('\\"}"',1)[0]
        elif 'Name:\'{"text":"' in command:
            name = command.split('Name:\'{"text":"',1)[1].split('"',1)[0]
        elif "SkullOwner:" in command and not "SkullOwner:{" in command:
            name = command.split("SkullOwner:",1)[1].split("}",1)[0]+"'s Head"
        else:
            name = input(command+"\nName: ")

        command = command.replace('\\"','\\\\"').replace("'","\\'").replace('"','\\"')
        text = open("items.js","r",encoding="utf8").read()
        text = text.rsplit("};",1)[0]
        while text.endswith("\n"): text = text[:-1]
        text = text+",\n"+'"'+name.replace("'","\\'")+"\": '"+command+"'\n};"
        savefile = open("items.js","w",encoding="utf8")
        savefile.write(text)
        savefile.close()
#    break
