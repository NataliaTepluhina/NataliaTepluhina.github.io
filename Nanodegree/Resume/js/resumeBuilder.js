// Definition of an objects of resume
var bio = {
    "name": "Natalia Tepluhina",
    "role": "Front-End Developer",
    "contacts": {
        "mobile": "+38 (099) 331-28-79",
        "email": "tarya.se@gmail.com",
        "github": "NataliaTepluhina",
        "location": "Kyiv, Ukraine"
    },
    "welcomeMessage": "Glad to see you at my resume page!",
    "skills": ["HTML", "CSS", "JavaScript"],
    "biopic": "http://i.imgur.com/ATqUPsE.jpg"
};

var education = {
    "schools": [{
            "name": "National Aviation University",
            "location": "Kiev, Ukraine",
            "degree": "Masters",
            "majors": ["Computer Engineering"],
            "dates": "2006",
            "url": "http://nau.edu.ua/en/"
        }
    ],
    "onlineCourses": [{
            "title": "Front-End Nanodegree",
            "school": "Udacity",
            "dates": "2014",
            "url": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
        }
    ]
};

var work = {
    "jobs": [{
            "employer": "Liga.Net",
            "title": "Content Manager",
            "location": "Kiev, Ukraine",
            "dates": "2007-2014",
            "description": "Maintained the financial section of the infomation agency website"
        },

        {
            "employer": "Olymp",
            "title": "Trademarker Analyst",
            "location": "Lutsk, Ukraine",
            "dates": "2005-2007",
            "description": "Maintained database of company financial information"
        }
    ]
};

var projects = {
    "projects": [{
            "title": "Crossbrowser Design",
            "dates": "2016",
            "description": "Adaptive crossbrowser webpage (IE8 included)",
            "images": ["http://i.imgur.com/x5DIUGk.jpg"]
        },

        {
            "title": "Responsive Design",
            "dates": "2016",
            "description": "Responsive blog",
            "images": ["http://i.imgur.com/0zORgKZ.jpg"]
        },

        {
            "title": "Responsive Portfolio",
            "dates": "2016",
            "description": "My portfolio project with responsive images",
            "images": ["http://i.imgur.com/Zumfxlb.jpg"]
        }
    ]
};

var data = "%data%";

// Function to display our bio information
bio.display = function() {
    // Add plain data
    $("#header").prepend(HTMLheaderRole.replace(data, bio.role));
    $("#header").prepend(HTMLheaderName.replace(data, bio.name));
    $("#header").append(HTMLbioPic.replace(data, bio.biopic));
    $("#header").append(HTMLwelcomeMsg.replace(data, bio.welcomeMessage));

    $("#header").append(HTMLskillsStart);
    // Loop for skills adding
    for (var i = 0; i < bio.skills.length; i++) {
        var formattedSkill = HTMLskills.replace(data, bio.skills[i]);
        $("#skills").append(formattedSkill);
    }

    // Add contacts to header and footer sections of the page
    var formattedMobile = HTMLmobile.replace(data, bio.contacts.mobile);
    var formattedEmail = HTMLemail.replace(data, bio.contacts.email);
    var formattedGithub = HTMLgithub.replace(data, bio.contacts.github);
    var formattedLocation = HTMLlocation.replace(data, bio.contacts.location);

    $("#topContacts, #footerContacts").append(formattedMobile, formattedEmail, formattedGithub, formattedLocation);
};

bio.display();

// Function to display our work information
work.display = function() {
    work.jobs.forEach(function(key) {
            $("#workExperience").append(HTMLworkStart);

            var formattedEmployer = HTMLworkEmployer.replace(data, key.employer);
            var formattedTitle = HTMLworkTitle.replace(data, key.title);
            var formattedLocation = HTMLworkLocation.replace(data, key.location);
            var formattedDates = HTMLworkDates.replace(data, key.dates);
            var formattedDescription = HTMLworkDescription.replace(data, key.description);

            $(".work-entry:last").append(formattedEmployer + formattedTitle);
            $(".work-entry:last").append(formattedLocation);
            $(".work-entry:last").append(formattedDates);
            $(".work-entry:last").append(formattedDescription);

    });
};

work.display ();

// Function to display our projects information
projects.display = function() {
    projects.projects.forEach(function(key) {
        $("#projects").append(HTMLprojectStart);

        var formattedTitle = HTMLprojectTitle.replace(data, key.title);
        var formattedDates = HTMLprojectDates.replace(data, key.dates);
        var formattedDescription = HTMLprojectDescription.replace(data, key.description);

        $(".project-entry:last").append(formattedTitle);
        $(".project-entry:last").append(formattedDates);
        $(".project-entry:last").append(formattedDescription);

        // Additional loop for images
        for (var i = 0; i < key.images.length; i++) {
            var formattedImage = HTMLprojectImage.replace(data, key.images[i]);
            $(".project-entry:last").append(formattedImage);
        }

    });
};

projects.display();

// Function to display our education information
education.display = function() {
    //One loop for schools section
    education.schools.forEach(function(key) {
        $("#education").append(HTMLschoolStart);

        var formattedName = HTMLschoolName.replace(data, key.name);
        var formattedDegree = HTMLschoolDegree.replace(data, key.degree);
        var formattedDates = HTMLschoolDates.replace(data, key.dates);
        var formattedLocation = HTMLschoolLocation.replace(data, key.location);
        var formattedMajor = HTMLschoolMajor.replace(data, key.majors);

        $(".education-entry:last").append(formattedName + formattedDegree);
        $(".education-entry:last").append(formattedDates);
        $(".education-entry:last").append(formattedLocation);
        $(".education-entry:last").append(formattedMajor);

    });

    //And another loop for online courses section
    $("#education").append(HTMLonlineClasses);
    education.onlineCourses.forEach(function(key) {
        $("#education").append(HTMLschoolStart);
        var courseTitle = HTMLonlineTitle.replace(data, key.title);
        var courseSchool = HTMLonlineSchool.replace(data, key.school);
        var courseDates = HTMLonlineDates.replace(data, key.dates);
        var courseURL = HTMLonlineURL.replace(data, key.url);

        $(".education-entry:last").append(courseTitle + courseSchool);
        $(".education-entry:last").append(courseDates);
        $(".education-entry:last").append(courseURL);

    });
};

education.display();

$("#mapDiv").append(googleMap);