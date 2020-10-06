import sys
import os
import time
import datetime


def createFolder(val):
    # Erstellt die Ordner für die Sortierung, falls diese noch nicht vorhanden sind

    if not os.path.exists(folder_to_track + val):
        os.makedirs(folder_to_track + val)


def checkFileAndRename(new_destination, filename):
    # Kontrolliert ob die Datei schon vorhanden ist, fals ja benennts es die Datei um
    if os.path.exists(new_destination + "/" + filename):
        name, ext = os.path.splitext(filename)
        now = str(datetime.datetime.now())[:19]
        now = now.replace(":", "-")
        now = now.replace(" ", "_")
        return new_destination + "/" + name + "_" + now + ext
    return new_destination + "/" + filename


def sortFiles(val, val1):
     # Kern des Scripts. Bei einer Änderung im Ordner wir dieser Code ausgeführt. Jenach Dateiextension wird sie in für sie definierten Ordner abgelegt
    createFolder(val1)
    for filename in os.listdir(folder_to_track):
        name, ext = os.path.splitext(filename)

        ext = ext[1:]

        if ext == val:
            folder_destination = val1
        else:
            continue
        src = folder_to_track + "/" + filename
        new_destination = checkFileAndRename(
            folder_to_track + "/" + folder_destination, filename)
        try:
            os.rename(src, new_destination)
        except:
            time.sleep(0.1)


# Start script
folderDic = {}
try:
    folder_to_track = str(sys.argv[1] + "/")
    folder_name = str(sys.argv[2])
    folder_type = str(sys.argv[3])
    folderDic[folder_name] = folder_type
    sortFiles(folder_type, folder_name)
    print("Finished")

except IndexError:
    print("No Path")
