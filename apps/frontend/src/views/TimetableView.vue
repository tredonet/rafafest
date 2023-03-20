<script setup lang="ts">
import beach from "@/assets/img/beach.png";
import centre from "@/assets/img/centre.png";
import picnic from "@/assets/img/picnic.png";
import dinner from "@/assets/img/dinner.png";
import party from "@/assets/img/party.png";
import market from "@/assets/img/market.png";
import ballloons from "@/assets/img/balloons.svg";
import { TimetableCard } from "@/components";
</script>
<template>
  <div class="page">
    <div class="flex justify-center q-gutter-x-xl">
      <div class="timetable">
        <div class="title-small">Friday</div>
        <TimetableCard
          :image="beach"
          title="Beach Party"
          time="12.00 - 18.00"
          location="Beach"
          :tags="['beach things', 'drinks', 'snacks', 'games', 'sunscreen']"
        />

        <TimetableCard
          :image="centre"
          title="Drinks in the centre"
          time="21.00 - the end"
          location="Centre"
          :tags="['beach things', 'drinks', 'snacks', 'games', 'sunscreen']"
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
      </div>

      <div class="timetable">
        <div class="title-small flex q-gutter-x-sm">
          <div>Sunday</div>
          <img :src="ballloons" />
        </div>
        <TimetableCard
          :image="market"
          title="Birthday Brunch"
          time="13.00 - 18.00"
          location="Mercat de blabla"
        />
      </div>
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
