<script lang="ts" setup>
/// <reference types="@types/google.maps" />

const { isDark } = useDarkMode()

const mapCanvas = ref<HTMLElement | null>(null)

tryOnMounted(async () => {
  const appEl = document.querySelector('ion-app')!
  const darkStyle: never[] = []

  try {
    await loadGoogleMapsAPI('YOUR_API_KEY_HERE')
  }
  catch (error) {
    // Handle the Google Maps API error here (e.g., log it or display a message).
    console.error('Error loading Google Maps API:', error)
  }

  // let map: google.maps.Map
  const locations = await $fetch('/api/locations')
  const mapCenter = locations?.find(
    (location: { id: number }) => location.id === 1,
  )

  const mapData = locations.slice(1) // Exclude the first item (Map Center)

  const map = new google.maps.Map(mapCanvas.value!, {
    center: {
      lat: mapCenter!.lat,
      lng: mapCenter!.lng,
    },
    zoom: 16,
    styles: isDark.value ? darkStyle : [],
  })

  mapData.forEach((markerData: { name: any, lat: any, lng: any }) => {
    const infoWindow = new google.maps.InfoWindow({
      content: `<h5>${markerData.name}</h5>`,
    })

    const marker = new google.maps.Marker({
      position: {
        lat: markerData.lat,
        lng: markerData.lng,
      },
      map,
      title: markerData.name,
    })

    marker.addListener('click', () => {
      infoWindow.open(map, marker)
    })
  })

  google.maps.event.addListenerOnce(map, 'idle', () => {
    mapCanvas.value?.classList.add('show-map')
  })

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        if (map) {
          map.setOptions({ styles: isDark ? darkStyle : [] })
        }
      }
    })
  })
  observer.observe(appEl, {
    attributes: true,
  })
})

async function loadGoogleMapsAPI(apiKey: string) {
  if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
    return // API already loaded
  }

  return new Promise<void>((resolve, reject) => {
    (window as any).initMap = () => {
      resolve()
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.54&callback=initMap`
    script.async = true
    script.defer = true

    script.onerror = () => {
      reject(new Error('Failed to load Google Maps API'))
    }

    document.body.appendChild(script)
  })
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>
        <ion-title>Map</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div ref="mapCanvas" class="map-canvas" />
    </ion-content>
  </ion-page>
</template>

  <style scoped>
  .map-canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: opacity 150ms ease-in;
    background-color: transparent;
    opacity: 0;
  }

  .show-map {
    opacity: 1;
  }
  </style>
