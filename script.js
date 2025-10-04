
 let searchbtn =document.getElementById("searchButton");
 let usernameinp =document.getElementById("usernameInput");
 let card =document.getElementById("userProfile");

function getprofiledata(username){
    return fetch(`https://api.github.com/users/${username}`).then(raw =>{
        if( !raw.ok) throw new Error("user not found.");
        return raw.json();
           
    });
}

function getrepos(username){
    return fetch(`https://api.github.com/users/${username}/repos?short=updated`).then(raw =>{
        if( !raw.ok) throw new Error("failed to fetch repos.");
        return raw.json(); 
});
}

function decorateprofiledata(details) {
    console.log(details)
     let data =` <!-- Profile Image -->
        <div class="flex-shrink-0 flex justify-center md:justify-start">
          <div class="relative group">
            <div class="w-28 h-28 rounded-full overflow-hidden ring-2 ring-indigo-600/40 group-hover:ring-indigo-500 transition-all duration-300">
              <img
                id="avatar"
                src="${details.avatar_url}"
                alt="GitHub Avatar"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- User Info -->
        <div class="flex-1 text-left">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h2 id="name" class="text-xl font-semibold text-white tracking-tight">${details.name}</h2>
            <a
              id="profileLink"
              href="${details.html_url}"
              target="_blank"
              class="text-indigo-400 hover:underline text-xs flex items-center gap-1"
            >
             ${details.html_url} <i class="ri-external-link-line"></i>
            </a>
          </div>

          <p id="bio" class="text-gray-400 mt-1 text-sm leading-relaxed">
            ${details.bio ? details.bio: ""}
          </p>

          <!-- Stats -->
          <div class="mt-4 grid grid-cols-3 text-center bg-[#0d1117]/60 border border-gray-800 rounded-xl py-3 text-sm">
            <div class="hover:bg-[#1c2128] transition-all rounded-lg p-1.5">
              <h3 class="text-base font-bold text-white" id="repos">${details.public_repos}</h3>
              <p class="text-gray-500 text-xs">Repos</p>
            </div>
            <div class="hover:bg-[#1c2128] transition-all rounded-lg p-1.5">
              <h3 class="text-base font-bold text-white" id="followers">${details.followers}</h3>
              <p class="text-gray-500 text-xs">Followers</p>
            </div>
            <div class="hover:bg-[#1c2128] transition-all rounded-lg p-1.5">
              <h3 class="text-base font-bold text-white" id="following">${details.following}</h3>
              <p class="text-gray-500 text-xs">Following</p>
            </div>
          </div>

          <!-- Additional Info -->
          <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-400">
            <div class="flex items-center gap-1.5">
              <i class="ri-map-pin-line text-indigo-400 text-base"></i>
              <span id="location">${details.location ?details.location:"N/A"}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <i class="ri-building-line text-indigo-400 text-base"></i>
              <span id="company">${details.company ?details.company:"N/A"}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <i class="ri-link text-indigo-400 text-base"></i>
              <a id="blog" href="https://github.blog" target="_blank" class="hover:text-indigo-300 truncate">
               ${details.blog}
              </a>
            </div>
            <div class="flex items-center gap-1.5">
              <i class="ri-calendar-line text-indigo-400 text-base"></i>
              <span id="joined">${details.created_at}</span>
            </div>
          </div>
        </div>
      </div>`

      card.innerHTML=data;
}

 searchbtn.addEventListener('click', function () {
 let username = usernameinp.value.trim();
 if (username.length > 0) {
    getprofiledata(username).then((data) =>[
        decorateprofiledata(data)
    ])
 }else{
    alert();
 }
});