import pandas as pd
import numpy as np
import requests


# Esta funcion hace un request a spotify para obtener mas detalles de las cancioens que un usuario sigue
def getTrackFeatures(tracks, auth):
    # First, make the string for url
    ids = [track['id'] for track in tracks if 'name' in track]
    track_ids = 'ids=' + ','.join(ids)

    # Preparacion del url
    url = "https://api.spotify.com/v1/audio-features"
    headers = {
        "Authorization": auth
    }

    params = {
        "ids": track_ids
    }

    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        # print(response.json())
        response = response.json()['audio_features']
        response.pop(0)
        return response
    else:
        print(f"Failed to retrieve data: {response.status_code}")
        print(f"Failed to retrieve data: {response.text}")

    return False


def getUserMetrics(data, auth):

    track_details = getTrackFeatures(data, auth)
    if not track_details: # En caso de fallar, regresar False
        return False

    # Convertir los detalles a un dataframe
    tracks_df = pd.DataFrame(track_details)
    # print(tracks_df.dtypes)

    # Convertir a un dataframe data
    data_df = pd.DataFrame(data)

    # Hacer un join
    merged = pd.merge(data_df, tracks_df, on='id', how='inner')
    main_analysis(merged)

    return

# Esta funcion recibe el dataframe del usuario listo para analizar con el que detallamos en jupyter
def main_analysis(user_df):
    print(user_df)
    user_df.to_csv('user_df.csv', index=False)  
