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
  <div class="flex justify-center q-gutter-xl">

    <div class="timetable">
      <div class="title-small">Thursday</div>
      <TimetableCard
        :image="concert"
        title="Special Concert (?)"
        time="21.00 - 02.00"
        location="?"
      />
    </div>
    <div class="timetable">
      <div class="title-small">Friday</div>
      <TimetableCard
        :image="beach"
        title="Beach Party"
        time="12.00 - 18.00"
        location="Beach"
      />
      <TimetableCard
        :image="concert"
        title="Special Concert + Dinner"
        time="18.30 - 21.00"
        location="Dandy Horse"
      />

      <TimetableCard
        :image="centre"
        title="Drinks in the centre"
        time="21.00 - the end"
        location="Centre"
      />
    </div>

    <div class="timetable">
      <div class="title-small">Saturday</div>
      <TimetableCard
        :image="picnic"
        title="Pincnic in the park"
        time="14.00 - 18.00"
        location="Turia"
        :tags="['blanket', 'drinks', 'snacks', 'games', 'sunscreen']"
      />
      <TimetableCard
        title="Birthday Dinner"
        :image="dinner"
        time="20.00 - 00.00"
        location="Amor Amargo"
        :tags="['dinner', 'drinks', 'easy-going', 'menu', '45']"
      />

      <TimetableCard
        :image="party"
        title="Birthday Party"
        time="00.00 - the end"
        location="City"
        :tags="['dinner', 'drinks', 'easy-going', 'menu']"
      />
      <TimetableCard
        :image="dj"
        title="Birthday Party"
        time="00.00 - the end"
        location="City"
        :tags="['dinner', 'drinks', 'easy-going', 'menu']"
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
        time="13.00 - 18.00"
        location="Mercat de idk"
      />
    </div>
  </div>
</template>
<style>
.timetable {
  gap: 1rem;
  display: flex;
  flex-direction: column;
}
</style>
