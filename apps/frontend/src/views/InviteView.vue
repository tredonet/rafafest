<template>
  <div class="row justify-center">
    <div class="col-6 title">Let's get you signed up</div>
  </div>
  <div class="row justify-center">
    <div class="col-6">
      Lorem ipsum dolor sit amet consectetur. Scelerisque pharetra elementum
      amet nulla. In suspendisse pulvinar maecenas non risus dolor commodo
      scelerisque. Duis venenatis id nunc rutrum viverra magna.
    </div>
  </div>
  <div class="row justify-center">
    <q-form class="col-6 q-gutter-sm">
      <div class="row q-gutter-sm">
        <q-input
          class="col"
          rounded
          outlined
          label="First name"
          v-model="undefined"
        />
        <q-input
          class="col"
          rounded
          outlined
          label="Last name"
          v-model="undefined"
        />
      </div>
      <div class="row q-gutter-sm">
        <div class="col">
          <q-input
            rounded
            outlined
            label="Email Address"
            type="email"
            v-model="undefined"
          />
        </div>
      </div>
      <div class="row q-gutter-sm">
        <div class="col">
          Most importantly: are you able to be in Valencia on and around the
          15th of April, 2023?
        </div>
      </div>
      <div class="row q-gutter-sm">
        <q-btn
          class="col"
          unelevated
          color="green"
          rounded
          label="Yes - 100%"
        />
        <q-btn
          class="col"
          unelevated
          color="dark"
          rounded
          label="Not sure yet"
        />
        <q-btn class="col" unelevated color="dark" rounded label="I can't" />
      </div>
      <div class="row q-gutter-sm">
        <q-btn class="col" unelevated color="green" rounded label="Confirm"/>
      </div>
    </q-form>
  </div>
</template>
