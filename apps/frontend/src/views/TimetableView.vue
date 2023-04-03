<script setup lang="ts">
import beach from "@/assets/img/beach.jpg";
import dj from "@/assets/img/dj.jpg";
import concert from "@/assets/img/concert.jpg";
import centre from "@/assets/img/centre.jpg";
import picnic from "@/assets/img/picnic.jpg";
import dinner from "@/assets/img/dinner.jpg";
import party from "@/assets/img/party.jpg";
import market from "@/assets/img/market.jpg";
import ballloons from "@/assets/img/balloons.svg";
import { TimetableCard } from "@/components";
</script>
<template>
  <div class="flex justify-center q-gutter-xl q-pb-lg">
    <div class="timetable justify-between">
      <div class="title-small">Thursday</div>
      <TimetableCard
        :image="concert"
        title="Concert by Dominik Faitsch & Weltbildhauer:innen"
        time="19.30"
        location="On Air"
        image-ratio="4/3"
        location-link="https://goo.gl/maps/kCgmK3CXmwMU8Agm7"
      />
    </div>
    <div class="timetable">
      <div class="title-small">Friday</div>
      <div class="timetable justify-between">
        <TimetableCard
          :image="beach"
          title="Beach Day"
          time="From 12.00"
          location="Beach"
          image-ratio="1/1"
          location-link="https://goo.gl/maps/WJJ1DjZwHzYcS2wM7"
        />
        <TimetableCard
          :image="centre"
          title="Pre Birthday Party"
          time="23.00 - the end"
          location="Radio City"
          image-ratio="16/9"
          location-link="https://goo.gl/maps/WKoq2F87yGSivXWE8"
        />
      </div>
    </div>

    <div class="timetable">
      <div class="title-small">Saturday</div>
      <TimetableCard
        :image="picnic"
        title="Picnic in the Park"
        time="13.00 - 17.00"
        location="Turia"
        image-ratio="20/9"
      />
      <TimetableCard
        title="Birthday Dinner"
        :image="dinner"
        time="20.00 - 22.30"
        location="Amor Amargo"
        image-ratio="20/9"
        location-link="https://goo.gl/maps/oogStghDPMeptrrj6"
      />

      <TimetableCard
        :image="party"
        title="Raphael Turns 30"
        time="23.00 - 01.00"
        location="Mat32"
        image-ratio="26/9"
        location-link="https://goo.gl/maps/AcxsYcxykMJhp3iV8"
      />
      <TimetableCard
        :image="dj"
        title="Dance, Dance, Dance"
        time="01.30 - the end"
        location="ElectroPura"
        image-ratio="30/9"
        location-link="https://goo.gl/maps/DrcdXP3BfdvKUW3K7"
      />
    </div>

    <div class="timetable">
      <div class="title-small flex justify-center q-gutter-x-sm">
        <div>Sunday</div>
        <img :src="ballloons" />
      </div>
      <TimetableCard
        :image="market"
        title="Birthday Brunch"
        time="From 11.30"
        location="Mercat Imprenta"
        image-ratio="1/1"
        location-link="https://goo.gl/maps/NaqLGEqV9w6jaEsc7"
      />
    </div>
  </div>
</template>
<style>
.timetable .timetable {
  flex: 1;
}

.timetable {
  gap: 1rem;
  display: flex;
  flex-direction: column;
}
</style>
