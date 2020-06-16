<template>
  <v-container class="pa-3">
    <v-layout wrap>
      <v-flex xs24 sm64>
        <v-layout wrap column>
          <v-flex>
            <v-card rounded outlined size="100" class="algin-center pa-1">
              <v-card-title>
                <v-layout>
                  <p text class="questrial font-weight-bold text-none">Create a new Contract</p>
                </v-layout>
              </v-card-title>
              <div class="pa-2">
                <v-layout>
                  <v-flex xs12>
                    <form @submit.stop.prevent="handleSubmit">
                      <v-text-field
                        v-model="title"
                        label="Contract Title"
                        required
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                        outlined
                        rows="1"
                        row-height="35"
                      ></v-text-field>
                      <v-textarea
                        v-model="captions"
                        label="Contract Description"
                        auto-grow
                        outlined
                        rows="1"
                        row-height="335"
                      ></v-textarea>
                      <v-card-title class="pa-5">
                        <div>
                          <v-btn
                            color="blue"
                            absolute
                            left
                            outlined
                            depressed
                            text
                            class="questrial font-weight-bold text-none"
                            @click="captureFile"
                          >
                            <v-icon left>mdi-file</v-icon>Select Sign
                          </v-btn>
                          <input
                            ref="uploader"
                            class="d-none"
                            type="file"
                            accept="image/*"
                            @change="onFileChanged"
                          />
                        </div>

                        <v-btn
                          color="blue"
                          absolute
                          right
                          outlined
                          text
                          @click="handleOk"
                          class="questrial font-weight-bold text-none"
                        >
                          <v-icon left>mdi-pencil-plus</v-icon>Create
                        </v-btn>
                      </v-card-title>.
                      .
                      .
                      <p>{{buttonText}}</p>
                    </form>
                  </v-flex>
                </v-layout>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-container>
      <Feed />
    </v-container>
  </v-container>
</template>

<script>
import ipfs from "../contracts/ipfs";
import Feed from "./Feed";
export default {
  // data variables
  data() {
    return {
      defaultButtonText: "no file selected",
      selectedFile: null,
      buffer: "",
      caption: ""
    };
  },
  computed: {
    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    }
  },
  components: {
    Feed
  },
  methods: {
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];

      // do something
    },
    /* used to catch chosen image &
     * convert it to ArrayBuffer.
     */
    captureFile(file) {
      this.$refs.uploader.click();
      const reader = new FileReader();
      if (typeof file !== "undefined") {
        reader.readAsArrayBuffer(file.target.files[0]);
        reader.onloadend = async () => {
          this.buffer = await this.convertToBuffer(reader.result);
        };
      } else this.buffer = "";
    },
    /**
     * converts ArrayBuffer to
     * Buffer for IPFS upload.
     */
    async convertToBuffer(reader) {
      return Buffer.from(reader);
    },
    /**
     * submits buffered image & text to IPFS
     * and retrieves the hashes, then store
     * it in the Contract via sendHash().
     */
    onSubmit() {
      alert("Uploading on IPFS...");
      this.$root.loading = true;
      let signimgHash;
      ipfs
        .add(this.buffer)
        .then(hashedImg => {
          signimgHash = hashedImg[0].hash;
          return this.convertToBuffer(this.caption);
        })
        .then(bufferDesc =>
          ipfs.add(bufferDesc).then(hashedText => hashedText[0].hash)
        )
        .then(contracttitleHash => {
          this.$root.contract.methods
            .sendHash(signimgHash, contracttitleHash)
            .send(
              { from: this.$root.currentAccount },
              (error, transactionHash) => {
                if (typeof transactionHash !== "undefined") {
                  alert("Storing on Ethereum...");
                  this.$root.contract.once(
                    "NewPost",
                    { from: this.$root.currentAccount },
                    () => {
                      this.$root.getPosts();
                      alert("Operation Finished! Refetching...");
                    }
                  );
                } else this.$root.loading = false;
              }
            );
        });
    },
    /**
     * validates if image & captions
     * are filled before submission.
     */
    handleOk() {
      if (!this.buffer || !this.caption) {
        alert("Please fill in the information.");
      } else {
        this.onSubmit();
      }
    }
  }
};
</script>

<style>
@import url("//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css");
.search {
  position: relative;
}
.search input {
  text-indent: 30px;
}
.search .fa-search {
  position: absolute;
  top: 24px;
  left: 7px;
  font-size: 15px;
}
.no-top-padding.v-text-field {
  padding-top: 0 !important;
}
.v-text-field .v-input__append-inner {
  padding-top: 5px;
}

.home-load {
  width: 50px;
  height: 50px;
}
.card img {
  object-fit: cover;
  height: 500px;
  width: 500px;
}
.card {
  text-align: left;
  width: 500px;
  margin-bottom: 20px;
}
.home-list {
  padding: 0;
  list-style: none;
}
.home-card-text {
  text-align: justify;
  margin-top: 10px;
}
#upload {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 5%;
  width: 500px;
}
.upload-load {
  width: 50px;
  height: 50px;
}
.margin-xs {
  margin-top: 3%;
}
.margin-sm {
  margin-top: 7%;
}
.border-style {
  border: 1px solid #ced4da;
}
</style>