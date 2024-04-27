import pandas as pd
import numpy as np
import requests


# Esta funcion hace un request a spotify para obtener mas detalles de las cancioens que un usuario sigue
def getTrackFeatures(tracks, auth):
    # First, make the string for url
    ids = [track['track_id'] for track in tracks if 'name' in track]
    url = 'ids=' + ','.join(ids)
    print(url)




def getUserMetrics(data, auth):


    # 1. Se recibe un arreglo de objetos, convertir a un DataFrame 
    getTrackFeatures(data, auth)

    return
