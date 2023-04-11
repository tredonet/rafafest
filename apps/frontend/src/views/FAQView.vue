<script setup lang="ts">
import { FAQCard } from "@/components";
import spriteLaptop from "@/assets/doodles/rafa-laptop.svg";
import spriteGlasses from "@/assets/doodles/rafa-glasses.svg";
import metrovalencia from "@/assets/img/metrovalencia.png";
import spriteTea from "@/assets/doodles/rafa-tea.svg";
import spritePhone from "@/assets/doodles/rafa-phone.svg";
import weather from "@/assets/img/weather.svg";
</script>
<template>
  <div class="title-small align-left">
    Here are a few "thanks for sharing that"
  </div>
  <div class="card-container">
    <FAQCard title="Where to stay?" :sprite="spriteTea">
      Ruzafa is known for its trendy bars and restaurants, as well as its
      colorful street art and bohemian vibe. It's the perfect spot for those
      looking to experience Valencia's vibrant nightlife and cultural scene.<br />
      El Carmen on the other hand, is a historic neighborhood with narrow
      winding streets, charming plazas, and beautiful old buildings. It's a
      great area to explore for those interested in architecture and history.<br />
      Benimaclet, it's a neighborhood with a lot of personality. It's known for
      its lively atmosphere and its street art and murals. It's the perfect spot
      for those looking for a more laid-back bohemian experience.
      <ul class="text notes" style="font-size: 0.8rem; margin: 0.5rem auto">
        <li>Hostel (from €15 per night)</li>
        <li>Hotel (from €60 per night)</li>
        <li>Airbnb (depends, the usual)</li>
      </ul>
    </FAQCard>
    <FAQCard title="What to bring?" :sprite="spriteGlasses" :sprite-left="true">
      Explore Valencia in style! Pack comfy shoes to walk all day, light layers
      for warmth, a small backpack for your camera and cash, and a raincoat or
      umbrella in case of rain. No te olvides de traer un pequeño libro de
      frases en español for those unexpected conversations. And last but not
      least, bring whatever else you need for a perfect weekend!
      <img :src="weather" style="float: right; margin: 2rem 0" />
    </FAQCard>
    <FAQCard
      title="How to get around"
      :sprite="spritePhone"
      :background-image="metrovalencia"
    >
      The metro is a great option for getting around quickly and you can reach
      most destinations in just a few minutes. Bus and tram are also great
      options. <br />Another great way to get around Valencia is by bike. Get a
      Valenbisi subscription or rent one for a day. Cycling is a fantastic way
      to explore Valencia's lovely parks and waterfront. <br />Valencia is a
      very walkable city with many pedestrianized streets and plazas. It's a
      great way to explore the city and discover hidden gems. <br />Finally, if
      you're planning on making day trips outside of Valencia, you can take the
      train to reach nearby towns and cities.
      <ul class="text notes" style="font-size: 0.8rem; margin: 0.5rem auto">
        <li>
          Airport - City: by Metro from 5.00am to 11.30pm (€5.80) or taxi (€15 -
          €20; pay by card or cash)
        </li>
        <li>Bus ride single fare: €1.50</li>
        <li>
          Valenbisi (Valencias bike sharing system): €13 for a whole week!
        </li>
      </ul>
      <div class="buttons">
        <button
          class="button"
          onclick="window.open('https://www.metrovalencia.es/');"
        >
          MetroValencia
        </button>
        <button
          class="button"
          onclick="window.open('https://www.valenbisi.es/en/home');"
        >
          Valenbisi
        </button>
      </div>
    </FAQCard>
    <FAQCard
      title="Finances and Expenses"
      :sprite="spriteLaptop"
      :sprite-left="true"
    >
      Valencia is known for its delicious paella and other traditional Spanish
      dishes and we want to make sure you get to experience the best of what the
      city has to offer. For that we're organising the weekend with a focus on
      food and are planning the following:
      <ul class="text notes" style="font-size: 0.8rem; margin: 0.5rem auto">
        <li>One dinner at a restaurant on Saturday</li>
        <li>One birthday-brunch at a foodcourt on Sunday</li>
        <li>A gathering on the beach on Friday (bring what you like)</li>
        <li>A picnic in the park on Saturday (bring what you like)</li>
      </ul>
      We made a group reservation at the restaurant for a fixed price of €45 per
      person, drinks included. <br />
      <br />
      When it comes to the rest of the activities, it’s highly dependent on you!
      Drinking a cup of water or treating yourself with that nice bottle of
      Spanish Rioja that perfectly matches the Tapas on the table? You decide!
      <br />
      <br />
      During the nightly hours, we will be enjoying regular nightlife without
      any reservations whatsoever. You can expect a bottle of beer to cost
      around €3 and a pint around €5. In case you don't feel like dancing,
      you'll find that places without a dancefloor are usually cheaper.
    </FAQCard>
  </div>
</template>
<style>
.buttons {
  margin: 0.5rem auto;
  flex-wrap: wrap;
  display: flex;
  gap: 1rem;
}
.card-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 90rem;
}
.card-container .faq-card {
  margin: 1.5rem 0;
  align-self: flex-start;
}
.card-container .faq-card:nth-of-type(2n) {
  align-self: flex-end;
}
</style>
