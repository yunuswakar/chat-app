const mongoose = require('mongoose');
const schema = mongoose.Schema;

var airportJSON = new schema(
   [{
    label:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    iata:{
        type:String
    },
    airport:{
        type:String
    },
    currency_code:{
      type:String
    }
   }],
    { timestamps: true }
);

module.exports = mongoose.model('airportJSON', airportJSON);





mongoose.model('airportJSON', airportJSON).find((error, result) => {
    if (result.length == 0) {
        let obj = // 20200301162640
        // https://d2yq2mw7185ana.cloudfront.net/devdocs/airhob_airport_list-1.json
        
        [
          {
            "label": "New Delhi, India (DEL)",
            "city": "New Delhi",
            "country": "India",
            "iata": "DEL",
            "airport": "Indira Gandhi International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Mumbai, India (BOM)",
            "city": "Mumbai",
            "country": "India",
            "iata": "BOM",
            "airport": "Chhatrapati Shivaji International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Goa, India (GOI)",
            "city": "Goa",
            "country": "India",
            "iata": "GOI",
            "airport": "Dabolim Airport",
            "currency_code": "INR"
          },
          {
            "label": "Bangalore, India (BLR)",
            "city": "Bangalore",
            "country": "India",
            "iata": "BLR",
            "airport": "Bengaluru International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Chennai, India (MAA)",
            "city": "Chennai",
            "country": "India",
            "iata": "MAA",
            "airport": "Chennai International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kolkata, India (CCU)",
            "city": "Kolkata",
            "country": "India",
            "iata": "CCU",
            "airport": "Netaji Subhash Chandra Bose International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Hyderabad, India (HYD)",
            "city": "Hyderabad",
            "country": "India",
            "iata": "HYD",
            "airport": "Rajiv Gandhi International Airport, Shamshabad",
            "currency_code": "INR"
          },
          {
            "label": "Pune, India (PNQ)",
            "city": "Pune",
            "country": "India",
            "iata": "PNQ",
            "airport": "Pune Airport",
            "currency_code": "INR"
          },
          {
            "label": "Ahmedabad, India (AMD)",
            "city": "Ahmedabad",
            "country": "India",
            "iata": "AMD",
            "airport": "Sardar Vallabhbhai Patel International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Lucknow, India (LKO)",
            "city": "Lucknow",
            "country": "India",
            "iata": "LKO",
            "airport": "Chaudhary Charan Singh International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Cochin, India (COK)",
            "city": "Cochin",
            "country": "India",
            "iata": "COK",
            "airport": "Cochin International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Dubai, UAE (DXB)",
            "city": "Dubai",
            "country": "UAE",
            "iata": "DXB",
            "airport": "Dubai International Airport",
                "currency_code": "AED"
          
          },
          {
            "label": "Patna, India (PAT)",
            "city": "Patna",
            "country": "India",
            "iata": "PAT",
            "airport": "Lok Nayak Jayaprakash Airport",
            "currency_code": "INR"
          },
          {
            "label": "Jaipur, India (JAI)",
            "city": "Jaipur",
            "country": "India",
            "iata": "JAI",
            "airport": "Jaipur International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Srinagar, India (SXR)",
            "city": "Srinagar",
            "country": "India",
            "iata": "SXR",
            "airport": "Sheikh ul Alam Airport",
            "currency_code": "INR"
          },
          {
            "label": "Bhubaneshwar, India (BBI)",
            "city": "Bhubaneshwar",
            "country": "India",
            "iata": "BBI",
            "airport": "Biju Patnaik Airport",
            "currency_code": "INR"
          },
          {
            "label": "Guwahati, India (GAU)",
            "city": "Guwahati",
            "country": "India",
            "iata": "GAU",
            "airport": "Lokpriya Gopinath Bordoloi International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Singapore, Singapore (SIN)",
            "city": "Singapore",
            "country": "Singapore",
            "iata": "SIN",
            "airport": "Singapore Changi International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Bangkok, Thailand (BKK)",
            "city": "Bangkok",
            "country": "Thailand",
            "iata": "BKK",
            "airport": "Suvarnabhumi Airport",
            "currency_code": "THB"
            
          },
          {
            "label": "Chandigarh, India (IXC)",
            "city": "Chandigarh",
            "country": "India",
            "iata": "IXC",
            "airport": "Chandigarh Airport",
            "currency_code": "INR"
          },
          {
            "label": "Nagpur, India (NAG)",
            "city": "Nagpur",
            "country": "India",
            "iata": "NAG",
            "airport": "Dr. Babasaheb Ambedkar International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Indore, India (IDR)",
            "city": "Indore",
            "country": "India",
            "iata": "IDR",
            "airport": "Devi Ahilyabai Holkar Airport",
            "currency_code": "INR"
          },
          {
            "label": "Coimbatore, India (CJB)",
            "city": "Coimbatore",
            "country": "India",
            "iata": "CJB",
            "airport": "Coimbatore International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Vishakapatnam, India (VTZ)",
            "city": "Vishakapatnam",
            "country": "India",
            "iata": "VTZ",
            "airport": "Vishakhapatnam Airport",
            "currency_code": "INR"
          },
          {
            "label": "Trivandrum, India (TRV)",
            "city": "Trivandrum",
            "country": "India",
            "iata": "TRV",
            "airport": "Trivandrum International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Jammu, India (IXJ)",
            "city": "Jammu",
            "country": "India",
            "iata": "IXJ",
            "airport": "Jammu Airport",
            "currency_code": "INR"
          },
          {
            "label": "Raipur, India (RPR)",
            "city": "Raipur",
            "country": "India",
            "iata": "RPR",
            "airport": "Raipur Airport",
            "currency_code": "INR"
          },
          {
            "label": "Bagdogra, India (IXB)",
            "city": "Bagdogra",
            "country": "India",
            "iata": "IXB",
            "airport": "Bagdogra Airport",
            "currency_code": "INR"
          },
          {
            "label": "Varanasi, India (VNS)",
            "city": "Varanasi",
            "country": "India",
            "iata": "VNS",
            "airport": "Lal Bahadur Shastri Airport",
            "currency_code": "INR"
          },
          {
            "label": "Bhopal, India (BHO)",
            "city": "Bhopal",
            "country": "India",
            "iata": "BHO",
            "airport": "Bhopal Airport",
            "currency_code": "INR"
          },
          {
            "label": "Mangalore, India (IXE)",
            "city": "Mangalore",
            "country": "India",
            "iata": "IXE",
            "airport": "Mangalore International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Ranchi, India (IXR)",
            "city": "Ranchi",
            "country": "India",
            "iata": "IXR",
            "airport": "Birsa Munda Airport",
            "currency_code": "INR"
          },
          {
            "label": "Port Blair, India (IXZ)",
            "city": "Port Blair",
            "country": "India",
            "iata": "IXZ",
            "airport": "Vir Savarkar International Airport",
            "currency_code": "INR"
          },
          {
            "label": "New York, US - John F Kennedy (JFK)",
            "city": "New York",
            "country": "US",
            "iata": "JFK",
            "airport": "John F Kennedy International Airport",
            "currency_code": "USD"          
          },
          {
            "label": "New York, US - LaGuardia (LGA)",
            "city": "New York",
            "country": "US",
            "iata": "LGA",
            "airport": "La Guardia Airport",
            "currency_code": "USD"          },
          {
            "label": "Vadodara, India (BDQ)",
            "city": "Vadodara",
            "country": "India",
            "iata": "BDQ",
            "airport": "Vadodara Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kuala Lumpur, Malaysia (KUL)",
            "city": "Kuala Lumpur",
            "country": "Malaysia",
            "iata": "KUL",
            "airport": "Kuala Lumpur International Airport",
            "currency_code": "MYR"
          },
          {
            "label": "Kuala Lumpur, Malaysia (SZB)",
            "city": "Kuala Lumpur",
            "country": "Malaysia",
            "iata": "SZB",
            "airport": "Sultan Abdul Aziz Shah International Airport",
            "currency_code": "MYR"
          },
          {
            "label": "Madurai, India (IXM)",
            "city": "Madurai",
            "country": "India",
            "iata": "IXM",
            "airport": "Madurai Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kochi, Japan (KCZ)",
            "city": "Kochi",
            "country": "Japan",
            "iata": "KCZ",
            "airport": "Kochi Ryoma Airport",
            "currency_code": "JPY"         
           },
          {
            "label": "Kathmandu, Nepal (KTM)",
            "city": "Kathmandu",
            "country": "Nepal",
            "iata": "KTM",
            "airport": "Tribhuvan International Airport",
            "currency_code": "NPR"

            
          },
          {
            "label": "Amritsar, India (ATQ)",
            "city": "Amritsar",
            "country": "India",
            "iata": "ATQ",
            "airport": "Sri Guru Ram Dass Jee International Airport, Amritsar",
            "currency_code": "INR"
          },
          {
            "label": "London, Canada (YXU)",
            "city": "London",
            "country": "Canada",
            "iata": "YXU",
            "airport": "London Airport",
            "currency_code": "CAD"
          },
          {
            "label": "London, UK - Heathrow Airport (LHR)",
            "city": "London",
            "country": "UK",
            "iata": "LHR",
            "airport": "London Heathrow Airport",
            "currency_code": "GBP"
          },
          {
            "label": "London, UK - Gatwick Airport (LGW)",
            "city": "London",
            "country": "UK",
            "iata": "LGW",
            "airport": "London Gatwick Airport",
            "currency_code": "GBP"
          },
          {
            "label": "London, UK - City Airport (LCY)",
            "city": "London",
            "country": "UK",
            "iata": "LCY",
            "airport": "London City Airport",
            "currency_code": "GBP"
          },
          {
            "label": "London, UK - Luton Airport (LTN)",
            "city": "London",
            "country": "UK",
            "iata": "LTN",
            "airport": "London Luton Airport",
            "currency_code": "GBP"
          },
          {
            "label": "London, UK - Stansted Airport (STN)",
            "city": "London",
            "country": "UK",
            "iata": "STN",
            "airport": "London Stansted Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Hong Kong, China (HKG)",
            "city": "Hong Kong",
            "country": "China",
            "iata": "HKG",
            "airport": "Chek Lap Kok International Airport"
          },
          {
            "label": "Doha, Qatar (DOH)",
            "city": "Doha",
            "country": "Qatar",
            "iata": "DOH",
            "airport": "Doha International Airport"
          },
          {
            "label": "Dehradun, India (DED)",
            "city": "Dehradun",
            "country": "India",
            "iata": "DED",
            "airport": "Dehradun Airport",
            "currency_code": "INR"
          },
          {
            "label": "Tirupati, India (TIR)",
            "city": "Tirupati",
            "country": "India",
            "iata": "TIR",
            "airport": "Tirupati Airport",
            "currency_code": "INR"
          },
          {
            "label": "Colombo, Sri Lanka (CMB)",
            "city": "Colombo",
            "country": "Sri Lanka",
            "iata": "CMB",
            "airport": "Bandaranaike International Colombo Airport"
          },
          {
            "label": "Calicut, India (CCJ)",
            "city": "Calicut",
            "country": "India",
            "iata": "CCJ",
            "airport": "Calicut International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Imphal, India (IMF)",
            "city": "Imphal",
            "country": "India",
            "iata": "IMF",
            "airport": "Imphal Airport",
            "currency_code": "INR"
          },
          {
            "label": "Vijaywada, India (VGA)",
            "city": "Vijaywada",
            "country": "India",
            "iata": "VGA",
            "airport": "Vijayawada Airport",
            "currency_code": "INR"
          },
          {
            "label": "Udaipur, India (UDR)",
            "city": "Udaipur",
            "country": "India",
            "iata": "UDR",
            "airport": "Maharana Pratap Airport",
            "currency_code": "INR"
          },
          {
            "label": "Agartala, India (IXA)",
            "city": "Agartala",
            "country": "India",
            "iata": "IXA",
            "airport": "Agartala Airport",
            "currency_code": "INR"
          },
          {
            "label": "Aurangabad, India (IXU)",
            "city": "Aurangabad",
            "country": "India",
            "iata": "IXU",
            "airport": "Aurangabad Airport",
            "currency_code": "INR"
          },
          {
            "label": "Jodhpur, India (JDH)",
            "city": "Jodhpur",
            "country": "India",
            "iata": "JDH",
            "airport": "Jodhpur Airport",
            "currency_code": "INR"
          },
          {
            "label": "Muscat, Oman (MCT)",
            "city": "Muscat",
            "country": "Oman",
            "iata": "MCT",
            "airport": "Muscat International Airport",
            "currency_code": "OMR"          },
          {
            "label": "Surat, India (STV)",
            "city": "Surat",
            "country": "India",
            "iata": "STV",
            "airport": "Surat Airport",
            "currency_code": "INR"
          },
          {
            "label": "San Francisco, US (SFO)",
            "city": "San Francisco",
            "country": "US",
            "iata": "SFO",
            "airport": "San Francisco International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Toronto, Canada (YYZ)",
            "city": "Toronto",
            "country": "Canada",
            "iata": "YYZ",
            "airport": "Lester B. Pearson International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Toronto, Canada (YTZ)",
            "city": "Toronto",
            "country": "Canada",
            "iata": "YTZ",
            "airport": "Billy Bishop Toronto City Centre Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Phuket, Thailand (HKT)",
            "city": "Phuket",
            "country": "Thailand",
            "iata": "HKT",
            "airport": "Phuket International Airport",
            "currency_code": "THB"
          },
          {
            "label": "Chicago, US - O'Hare Intl (ORD)",
            "city": "Chicago",
            "country": "US",
            "iata": "ORD",
            "airport": "Chicago O'Hare International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Chicago, US - Midway Airport (MDW)",
            "city": "Chicago",
            "country": "US",
            "iata": "MDW",
            "airport": "Chicago Midway International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Abu Dhabi, UAE (AUH)",
            "city": "Abu Dhabi",
            "country": "UAE",
            "iata": "AUH",
            "airport": "Abu Dhabi International Airport"
          },
          {
            "label": "Jabalpur, India (JLR)",
            "city": "Jabalpur",
            "country": "India",
            "iata": "JLR",
            "airport": "Jabalpur Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kuwait, Kuwait (KWI)",
            "city": "Kuwait",
            "country": "Kuwait",
            "iata": "KWI",
            "airport": "Kuwait International Airport"
          },
          {
            "label": "Paris, France - Charles De Gaulle Airport (CDG)",
            "city": "Paris",
            "country": "France",
            "iata": "CDG",
            "airport": "Charles de Gaulle International Airport"
          },
          {
            "label": "Paris, France - Orly Airport (ORY)",
            "city": "Paris",
            "country": "France",
            "iata": "ORY",
            "airport": "Paris-Orly Airport"
          },
          {
            "label": "Paris, France - Beauvais-Tille Airport (BVA)",
            "city": "Paris",
            "country": "France",
            "iata": "BVA",
            "airport": ""
          },
          {
            "label": "Dibrugarh, India (DIB)",
            "city": "Dibrugarh",
            "country": "India",
            "iata": "DIB",
            "airport": "Dibrugarh Airport",
            "currency_code": "INR"
          },
          {
            "label": "Sydney, Canada (YQY)",
            "city": "Sydney",
            "country": "Canada",
            "iata": "YQY",
            "airport": "Sydney / J.A. Douglas McCurdy Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Sydney, Australia (SYD)",
            "city": "Sydney",
            "country": "Australia",
            "iata": "SYD",
            "airport": "Sydney Kingsford Smith International Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Rajkot, India (RAJ)",
            "city": "Rajkot",
            "country": "India",
            "iata": "RAJ",
            "airport": "Rajkot Airport",
            "currency_code": "INR"
          },
          {
            "label": "Male, Maldives (MLE)",
            "city": "Male",
            "country": "Maldives",
            "iata": "MLE",
            "airport": ""
          },
          {
            "label": "Riyadh, Saudi Arabia (RUH)",
            "city": "Riyadh",
            "country": "Saudi Arabia",
            "iata": "RUH",
            "airport": "King Khaled International Airport"
          },
          {
            "label": "Sharjah, UAE (SHJ)",
            "city": "Sharjah",
            "country": "UAE",
            "iata": "SHJ",
            "airport": "Sharjah International Airport"
          },
          {
            "label": "Allahabad, India (IXD)",
            "city": "Allahabad",
            "country": "India",
            "iata": "IXD",
            "airport": "Allahabad Airport",
            "currency_code": "INR"
          },
          {
            "label": "Newark, US (EWR)",
            "city": "Newark",
            "country": "US",
            "iata": "EWR",
            "airport": "Newark Liberty International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Frankfurt, Germany (FRA)",
            "city": "Frankfurt",
            "country": "Germany",
            "iata": "FRA",
            "airport": "Frankfurt am Main International Airport"
          },
          {
            "label": "Frankfurt, Germany (HHN)",
            "city": "Frankfurt",
            "country": "Germany",
            "iata": "HHN",
            "airport": "Frankfurt-Hahn Airport"
          },
          {
            "label": "Melbourne, US (MLB)",
            "city": "Melbourne",
            "country": "US",
            "iata": "MLB",
            "airport": "Melbourne International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Melbourne, Australia (MEL)",
            "city": "Melbourne",
            "country": "Australia",
            "iata": "MEL",
            "airport": "Melbourne International Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Dammam, Saudi Arabia (DMM)",
            "city": "Dammam",
            "country": "Saudi Arabia",
            "iata": "DMM",
            "airport": "King Fahd International Airport"
          },
          {
            "label": "Mauritius, Mauritius (MRU)",
            "city": "Mauritius",
            "country": "Mauritius",
            "iata": "MRU",
            "airport": "Sir Seewoosagur Ramgoolam International Airport"
          },
          {
            "label": "Silchar, India (IXS)",
            "city": "Silchar",
            "country": "India",
            "iata": "IXS",
            "airport": "Silchar Airport",
            "currency_code": "INR"
          },
          {
            "label": "Guangzhou, China (CAN)",
            "city": "Guangzhou",
            "country": "China",
            "iata": "CAN",
            "airport": "Guangzhou Baiyun International Airport"
          },
          {
            "label": "Zurich, Switzerland (ZRH)",
            "city": "Zurich",
            "country": "Switzerland",
            "iata": "ZRH",
            "airport": ""
          },
          {
            "label": "Los Angeles, US (LAX)",
            "city": "Los Angeles",
            "country": "US",
            "iata": "LAX",
            "airport": "Los Angeles International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Rajahmundry, India (RJA)",
            "city": "Rajahmundry",
            "country": "India",
            "iata": "RJA",
            "airport": "Rajahmundry Airport",
            "currency_code": "INR"
          },
          {
            "label": "Jeddah, Saudi Arabia (JED)",
            "city": "Jeddah",
            "country": "Saudi Arabia",
            "iata": "JED",
            "airport": "King Abdulaziz International Airport"
          },
          {
            "label": "Shanghai, China - Pu Dong Airport (PVG)",
            "city": "Shanghai",
            "country": "China",
            "iata": "PVG",
            "airport": "Shanghai Pudong International Airport"
          },
          {
            "label": "Shanghai, China - Hongqiao Airport (SHA)",
            "city": "Shanghai",
            "country": "China",
            "iata": "SHA",
            "airport": "Shanghai Hongqiao International Airport"
          },
          {
            "label": "Denpasar Bali, Indonesia (DPS)",
            "city": "Denpasar Bali",
            "country": "Indonesia",
            "iata": "DPS",
            "airport": "Ngurah Rai (Bali) International Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Istanbul, Turkey (IST)",
            "city": "Istanbul",
            "country": "Turkey",
            "iata": "IST",
            "airport": ""
          },
          {
            "label": "Istanbul, Turkey - Sabiha Gokcen (SAW)",
            "city": "Istanbul",
            "country": "Turkey",
            "iata": "SAW",
            "airport": ""
          },
          {
            "label": "Aizawl, India (AJL)",
            "city": "Aizawl",
            "country": "India",
            "iata": "AJL",
            "airport": "Tuirial Airport",
            "currency_code": "INR"
          },
          {
            "label": "Bahrain, Bahrain (BAH)",
            "city": "Bahrain",
            "country": "Bahrain",
            "iata": "BAH",
            "airport": "Bahrain International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Amsterdam, Netherlands (AMS)",
            "city": "Amsterdam",
            "country": "Netherlands",
            "iata": "AMS",
            "airport": "Amsterdam Airport Schiphol"
          },
          {
            "label": "Auckland, New Zealand (AKL)",
            "city": "Auckland",
            "country": "New Zealand",
            "iata": "AKL",
            "airport": "Auckland International Airport"
          },
          {
            "label": "Washington, US (IAD)",
            "city": "Washington",
            "country": "US",
            "iata": "IAD",
            "airport": "Washington Dulles International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Washington, US (DCA)",
            "city": "Washington",
            "country": "US",
            "iata": "DCA",
            "airport": "Ronald Reagan Washington National Airport",
            "currency_code": "USD"
          },
          {
            "label": "Gorakhpur, India (GOP)",
            "city": "Gorakhpur",
            "country": "India",
            "iata": "GOP",
            "airport": "Gorakhpur Airport",
            "currency_code": "INR"
          },
          {
            "label": "Manila, Philippines (MNL)",
            "city": "Manila",
            "country": "Philippines",
            "iata": "MNL",
            "airport": "Ninoy Aquino International Airport"
          },
          {
            "label": "Hubli, India (HBX)",
            "city": "Hubli",
            "country": "India",
            "iata": "HBX",
            "airport": "Hubli Airport",
            "currency_code": "INR"
          },
          {
            "label": "Beijing, China - Capital Airport (PEK)",
            "city": "Beijing",
            "country": "China",
            "iata": "PEK",
            "airport": "Beijing Capital International Airport"
          },
          {
            "label": "Beijing, China - Nanyuan Airport (NAY)",
            "city": "Beijing",
            "country": "China",
            "iata": "NAY",
            "airport": "Beijing Nanyuan Airport"
          },
          {
            "label": "Jakarta, Indonesia (CGK)",
            "city": "Jakarta",
            "country": "Indonesia",
            "iata": "CGK",
            "airport": "Soekarno-Hatta International Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Dimapur, India (DMU)",
            "city": "Dimapur",
            "country": "India",
            "iata": "DMU",
            "airport": "Dimapur Airport",
            "currency_code": "INR"
          },
          {
            "label": "Bhuj, India (BHJ)",
            "city": "Bhuj",
            "country": "India",
            "iata": "BHJ",
            "airport": "Bhuj Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kanpur, India (KNU)",
            "city": "Kanpur",
            "country": "India",
            "iata": "KNU",
            "airport": "Kanpur Airport",
            "currency_code": "INR"
          },
          {
            "label": "Boston, US (BOS)",
            "city": "Boston",
            "country": "US",
            "iata": "BOS",
            "airport": "General Edward Lawrence Logan International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Dhaka, Bangladesh (DAC)",
            "city": "Dhaka",
            "country": "Bangladesh",
            "iata": "DAC",
            "airport": "Dhaka / Hazrat Shahjalal International Airport",
            "currency_code": "BDT"
          },
          {
            "label": "Jorhat, India (JRH)",
            "city": "Jorhat",
            "country": "India",
            "iata": "JRH",
            "airport": "Jorhat Airport",
            "currency_code": "INR"
          },
          {
            "label": "Johannesburg, South Africa (JNB)",
            "city": "Johannesburg",
            "country": "South Africa",
            "iata": "JNB",
            "airport": "OR Tambo International Airport"
          },
          {
            "label": "Vancouver, Canada (YVR)",
            "city": "Vancouver",
            "country": "Canada",
            "iata": "YVR",
            "airport": "Vancouver International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Vancouver, Canada (CXH)",
            "city": "Vancouver",
            "country": "Canada",
            "iata": "CXH",
            "airport": "Vancouver Harbour Water Aerodrome",
            "currency_code": "CAD"
          },
          {
            "label": "Atlanta, US (ATL)",
            "city": "Atlanta",
            "country": "US",
            "iata": "ATL",
            "airport": "Hartsfield Jackson Atlanta International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Mysore, India (MYQ)",
            "city": "Mysore",
            "country": "India",
            "iata": "MYQ",
            "airport": "Mysore Airport",
            "currency_code": "INR"
          },
          {
            "label": "Munich, Germany (MUC)",
            "city": "Munich",
            "country": "Germany",
            "iata": "MUC",
            "airport": "Munich International Airport"
          },
          {
            "label": "Nairobi, Kenya (NBO)",
            "city": "Nairobi",
            "country": "Kenya",
            "iata": "NBO",
            "airport": "Jomo Kenyatta International Airport"
          },
          {
            "label": "Nairobi, Kenya (WIL)",
            "city": "Nairobi",
            "country": "Kenya",
            "iata": "WIL",
            "airport": "Nairobi Wilson Airport"
          },
          {
            "label": "Moscow, Russia - Sheremetyevo Airport (SVO)",
            "city": "Moscow",
            "country": "Russia",
            "iata": "SVO",
            "airport": "Sheremetyevo International Airport"
          },
          {
            "label": "Moscow, Russia (DME)",
            "city": "Moscow",
            "country": "Russia",
            "iata": "DME",
            "airport": "Domodedovo International Airport"
          },
          {
            "label": "Moscow, Russia (VKO)",
            "city": "Moscow",
            "country": "Russia",
            "iata": "VKO",
            "airport": "Vnukovo International Airport"
          },
          {
            "label": "Moscow, Russia (BKA)",
            "city": "Moscow",
            "country": "Russia",
            "iata": "BKA",
            "airport": "Bykovo Airport"
          },
          {
            "label": "Agatti Island, India (AGX)",
            "city": "Agatti Island",
            "country": "India",
            "iata": "AGX",
            "airport": "Agatti Airport",
            "currency_code": "INR"
          },
          {
            "label": "Milan, Italy - Malpensa Airport (MXP)",
            "city": "Milan",
            "country": "Italy",
            "iata": "MXP",
            "airport": "Malpensa International Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Milan, Italy (BGY)",
            "city": "Milan",
            "country": "Italy",
            "iata": "BGY",
            "airport": "Bergamo / Orio Al Serio Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Milan, Italy (LIN)",
            "city": "Milan",
            "country": "Italy",
            "iata": "LIN",
            "airport": "Linate Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Milan, Italy - Parma Airport (PMF)",
            "city": "Milan",
            "country": "Italy",
            "iata": "PMF",
            "airport": "Parma Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Manchester, UK (MAN)",
            "city": "Manchester",
            "country": "UK",
            "iata": "MAN",
            "airport": "Manchester Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Manchester, US (MHT)",
            "city": "Manchester",
            "country": "US",
            "iata": "MHT",
            "airport": "Manchester Airport",
            "currency_code": "USD"
          },
          {
            "label": "Seoul, South Korea - Incheon Airport (ICN)",
            "city": "Seoul",
            "country": "South Korea",
            "iata": "ICN",
            "airport": "Incheon International Airport"
          },
          {
            "label": "Seoul, South Korea - Gimpo Airport (GMP)",
            "city": "Seoul",
            "country": "South Korea",
            "iata": "GMP",
            "airport": "Gimpo International Airport"
          },
          {
            "label": "Barcelona, Spain (BCN)",
            "city": "Barcelona",
            "country": "Spain",
            "iata": "BCN",
            "airport": "Barcelona International Airport"
          },
          {
            "label": "Barcelona, Venezuela (BLA)",
            "city": "Barcelona",
            "country": "Venezuela",
            "iata": "BLA",
            "airport": "General Jose Antonio Anzoategui International Airport"
          },
          {
            "label": "Jamnagar, India (JGA)",
            "city": "Jamnagar",
            "country": "India",
            "iata": "JGA",
            "airport": "Jamnagar Airport",
            "currency_code": "INR"
          },
          {
            "label": "Brussels, Belgium (BRU)",
            "city": "Brussels",
            "country": "Belgium",
            "iata": "BRU",
            "airport": "Brussels Airport"
          },
          {
            "label": "Brussels, Belgium (CRL)",
            "city": "Brussels",
            "country": "Belgium",
            "iata": "CRL",
            "airport": "Brussels South Charleroi Airport"
          },
          {
            "label": "Kullu, India (KUU)",
            "city": "Kullu",
            "country": "India",
            "iata": "KUU",
            "airport": "Kullu Manali Airport",
            "currency_code": "INR"
          },
          {
            "label": "Manali, India (KUU)",
            "city": "Manali",
            "country": "India",
            "iata": "KUU",
            "airport": "Kullu Manali Airport",
            "currency_code": "INR"
          },
          {
            "label": "Rome, Italy (FCO)",
            "city": "Rome",
            "country": "Italy",
            "iata": "FCO",
            "airport": "Leonardo Da Vinci (Fiumicino) International Airport",
            "currency_code": "EUR"
           
          },
          {
            "label": "Rome, Italy (CIA)",
            "city": "Rome",
            "country": "Italy",
            "iata": "CIA",
            "airport": "Ciampino Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Agra, India (AGR)",
            "city": "Agra",
            "country": "India",
            "iata": "AGR",
            "airport": "Agra Airport",
            "currency_code": "INR"
          },
          {
            "label": "Agra, India  (nearest airport New Delhi, DEL)",
            "city": "Agra",
            "country": "India",
            "iata": "DEL",
            "airport": "Indira Gandhi International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Tokyo, Japan - Narita (NRT)",
            "city": "Tokyo",
            "country": "Japan",
            "iata": "NRT",
            "airport": "Narita International Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Tokyo, Japan - Haneda (HND)",
            "city": "Tokyo",
            "country": "Japan",
            "iata": "HND",
            "airport": "Tokyo International Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Athens, Greece (ATH)",
            "city": "Athens",
            "country": "Greece",
            "iata": "ATH",
            "airport": "Eleftherios Venizelos International Airport"
          },
          {
            "label": "Athens, US (AHN)",
            "city": "Athens",
            "country": "US",
            "iata": "AHN",
            "airport": "Athens Ben Epps Airport",
            "currency_code": "USD"
          },
          {
            "label": "Seattle, US (SEA)",
            "city": "Seattle",
            "country": "US",
            "iata": "SEA",
            "airport": "Seattle Tacoma International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Pondicherry, India(PNY)",
            "city": "Pondicherry",
            "country": "India",
            "iata": "PNY",
            "airport": "Pondicherry Airport",
            "currency_code": "INR"
          },
          {
            "label": "Koh Samui, Thailand (USM)",
            "city": "Koh Samui",
            "country": "Thailand",
            "iata": "USM",
            "airport": "Samui Airport",
            "currency_code": "THB"
          },
          {
            "label": "Belgaum, India (IXG)",
            "city": "Belgaum",
            "country": "India",
            "iata": "IXG",
            "airport": "Belgaum Airport",
            "currency_code": "INR"
          },
          {
            "label": "Vienna, Austria (VIE)",
            "city": "Vienna",
            "country": "Austria",
            "iata": "VIE",
            "airport": "Vienna International Airport"
          },
          {
            "label": "Geneva, Switzerland (GVA)",
            "city": "Geneva",
            "country": "Switzerland",
            "iata": "GVA",
            "airport": "Geneva Cointrin International Airport"
          },
          {
            "label": "Cairo, Egypt (CAI)",
            "city": "Cairo",
            "country": "Egypt",
            "iata": "CAI",
            "airport": "Cairo International Airport"
          },
          {
            "label": "Detroit, US (DTW)",
            "city": "Detroit",
            "country": "US",
            "iata": "DTW",
            "airport": "Detroit Metropolitan Wayne County Airport",
            "currency_code": "USD"
          },
          {
            "label": "Berlin, Germany (TXL)",
            "city": "Berlin",
            "country": "Germany",
            "iata": "TXL",
            "airport": "Berlin-Tegel International Airport"
          },
          {
            "label": "Berlin, Germany - Schonefeld Airport (SXF)",
            "city": "Berlin",
            "country": "Germany",
            "iata": "SXF",
            "airport": ""
          },
          {
            "label": "Berlin, Germany (THF)",
            "city": "Berlin",
            "country": "Germany",
            "iata": "THF",
            "airport": "Berlin-Tempelhof International Airport"
          },
          {
            "label": "Madrid, Spain (MAD)",
            "city": "Madrid",
            "country": "Spain",
            "iata": "MAD",
            "airport": "Madrid Barajas International Airport"
          },
          {
            "label": "Nanded, India (NDC)",
            "city": "Nanded",
            "country": "India",
            "iata": "NDC",
            "airport": "Nanded Airport",
            "currency_code": "INR"
          },
          {
            "label": "Bhavnagar, India (BHU)",
            "city": "Bhavnagar",
            "country": "India",
            "iata": "BHU",
            "airport": "Bhavnagar Airport",
            "currency_code": "INR"
          },
          {
            "label": "Stockholm, Sweden (ARN)",
            "city": "Stockholm",
            "country": "Sweden",
            "iata": "ARN",
            "airport": "Stockholm-Arlanda Airport"
          },
          {
            "label": "Stockholm, Sweden (BMA)",
            "city": "Stockholm",
            "country": "Sweden",
            "iata": "BMA",
            "airport": "Stockholm-Bromma Airport"
          },
          {
            "label": "Stockholm, Sweden (NYO)",
            "city": "Stockholm",
            "country": "Sweden",
            "iata": "NYO",
            "airport": "Stockholm Skavsta Airport"
          },
          {
            "label": "Stockholm, Sweden (VST)",
            "city": "Stockholm",
            "country": "Sweden",
            "iata": "VST",
            "airport": ""
          },
          {
            "label": "Copenhagen, Denmark (CPH)",
            "city": "Copenhagen",
            "country": "Denmark",
            "iata": "CPH",
            "airport": "Copenhagen Kastrup Airport"
          },
          {
            "label": "Houston, US - All Airports (HOU)",
            "city": "Houston",
            "country": "US",
            "iata": "HOU",
            "airport": "William P Hobby Airport",
            "currency_code": "USD"
          },
          {
            "label": "Houston, US (IAH)",
            "city": "Houston",
            "country": "US",
            "iata": "IAH",
            "airport": "George Bush Intercontinental Houston Airport",
            "currency_code": "USD"
          },
          {
            "label": "Brisbane, Australia (BNE)",
            "city": "Brisbane",
            "country": "Australia",
            "iata": "BNE",
            "airport": "Brisbane International Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Dharamshala, India (DHM)",
            "city": "Dharamshala",
            "country": "India",
            "iata": "DHM",
            "airport": "Kangra Airport",
            "currency_code": "INR"
          },
          {
            "label": "Cape Town, South Africa (CPT)",
            "city": "Cape Town",
            "country": "South Africa",
            "iata": "CPT",
            "airport": "Cape Town International Airport"
          },
          {
            "label": "Khajuraho, India (HJR)",
            "city": "Khajuraho",
            "country": "India",
            "iata": "HJR",
            "airport": "Khajuraho Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kiev, Ukraine - Borispol Apt (KBP)",
            "city": "Kiev",
            "country": "Ukraine",
            "iata": "KBP",
            "airport": "Boryspil International Airport"
          },
          {
            "label": "Kiev, Ukraine - Zhulhany Apt (IEV)",
            "city": "Kiev",
            "country": "Ukraine",
            "iata": "IEV",
            "airport": "Kiev Zhuliany International Airport"
          },
          {
            "label": "Langkawi, Malaysia (LGK)",
            "city": "Langkawi",
            "country": "Malaysia",
            "iata": "LGK",
            "airport": "Langkawi International Airport"
          },
          {
            "label": "Gwalior, India (GWL)",
            "city": "Gwalior",
            "country": "India",
            "iata": "GWL",
            "airport": "Gwalior Airport",
            "currency_code": "INR"
          },
          {
            "label": "Perth, Australia (PER)",
            "city": "Perth",
            "country": "Australia",
            "iata": "PER",
            "airport": "Perth International Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Prague, Czech Republic (PRG)",
            "city": "Prague",
            "country": "Czech Republic",
            "iata": "PRG",
            "airport": "Ruzyne International Airport"
          },
          {
            "label": "Dublin, Ireland (DUB)",
            "city": "Dublin",
            "country": "Ireland",
            "iata": "DUB",
            "airport": "Dublin Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Birmingham, UK (BHX)",
            "city": "Birmingham",
            "country": "UK",
            "iata": "BHX",
            "airport": "Birmingham International Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Birmingham, US (BHM)",
            "city": "Birmingham",
            "country": "US",
            "iata": "BHM",
            "airport": "Birmingham-Shuttlesworth International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Paro, Bhutan (PBH)",
            "city": "Paro",
            "country": "Bhutan",
            "iata": "PBH",
            "airport": "Paro Airport"
          },
          {
            "label": "Las Vegas, US (LAS)",
            "city": "Las Vegas",
            "country": "US",
            "iata": "LAS",
            "airport": "McCarran International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Philadelphia, US (PHL)",
            "city": "Philadelphia",
            "country": "US",
            "iata": "PHL",
            "airport": "Philadelphia International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Philadelphia, US (TTN)",
            "city": "Philadelphia",
            "country": "US",
            "iata": "TTN",
            "airport": "Trenton Mercer Airport",
            "currency_code": "USD"
          },
          {
            "label": "Phoenix, US (PHX)",
            "city": "Phoenix",
            "country": "US",
            "iata": "PHX",
            "airport": "Phoenix Sky Harbor International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Minneapolis, US (MSP)",
            "city": "Minneapolis",
            "country": "US",
            "iata": "MSP",
            "airport": "Minneapolis-St Paul International/Wold-Chamberlain Airport",
            "currency_code": "USD"
          },
          {
            "label": "Calgary, Canada (YYC)",
            "city": "Calgary",
            "country": "Canada",
            "iata": "YYC",
            "airport": "Calgary International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Venice, Italy (VCE)",
            "city": "Venice",
            "country": "Italy",
            "iata": "VCE",
            "airport": "Venezia / Tessera -  Marco Polo Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Venice, Italy (TSF)",
            "city": "Venice",
            "country": "Italy",
            "iata": "TSF",
            "airport": "Treviso / Sant'Angelo Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Hangzhou, China (HGH)",
            "city": "Hangzhou",
            "country": "China",
            "iata": "HGH",
            "airport": "Hangzhou Xiaoshan International Airport"
          },
          {
            "label": "Tel Aviv Yafo, Israel (TLV)",
            "city": "Tel Aviv Yafo",
            "country": "Israel",
            "iata": "TLV",
            "airport": "Ben Gurion International Airport",
            "currency_code": "ILS"
          },
          {
            "label": "Tel Aviv Yafo, Israel (SDV)",
            "city": "Tel Aviv Yafo",
            "country": "Israel",
            "iata": "SDV",
            "airport": "Sde Dov Airport",
            "currency_code": "ILS"
          },
          {
            "label": "Krabi, Thailand (KBV)",
            "city": "Krabi",
            "country": "Thailand",
            "iata": "KBV",
            "airport": "Krabi Airport",
            "currency_code": "THB"
          },
          {
            "label": "Durham, US (RDU)",
            "city": "Durham",
            "country": "US",
            "iata": "RDU",
            "airport": "Raleigh Durham International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Miami, US (MIA)",
            "city": "Miami",
            "country": "US",
            "iata": "MIA",
            "airport": "Miami International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Orlando, US (MCO)",
            "city": "Orlando",
            "country": "US",
            "iata": "MCO",
            "airport": "Orlando International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Taipei, Taiwan (TPE)",
            "city": "Taipei",
            "country": "Taiwan",
            "iata": "TPE",
            "airport": "Taiwan Taoyuan International Airport"
          },
          {
            "label": "Taipei, Taiwan (TSA)",
            "city": "Taipei",
            "country": "Taiwan",
            "iata": "TSA",
            "airport": "Taipei Songshan Airport"
          },
          {
            "label": "Helsinki, Finland (HEL)",
            "city": "Helsinki",
            "country": "Finland",
            "iata": "HEL",
            "airport": "Helsinki Vantaa Airport"
          },
          {
            "label": "Dusseldorf, Germany (DUS)",
            "city": "Dusseldorf",
            "country": "Germany",
            "iata": "DUS",
            "airport": "Dusseldorf International Airport"
          },
          {
            "label": "Montreal, Canada (YUL)",
            "city": "Montreal",
            "country": "Canada",
            "iata": "YUL",
            "airport": "Montreal / Pierre Elliott Trudeau International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Dar Es Salaam, Tanzania (DAR)",
            "city": "Dar Es Salaam",
            "country": "Tanzania",
            "iata": "DAR",
            "airport": "Mwalimu Julius K. Nyerere International Airport"
          },
          {
            "label": "Rio de Janeiro, Brazil (GIG)",
            "city": "Rio de Janeiro",
            "country": "Brazil",
            "iata": "GIG",
            "airport": "Tom Jobim International Airport"
          },
          {
            "label": "Porbandar, India (PBD)",
            "city": "Porbandar",
            "country": "India",
            "iata": "PBD",
            "airport": "Porbandar Airport",
            "currency_code": "INR"
          },
          {
            "label": "Rio de Janeiro, Brazil (SDU)",
            "city": "Rio de Janeiro",
            "country": "Brazil",
            "iata": "SDU",
            "airport": "Santos Dumont Airport"
          },
          {
            "label": "Lagos, Nigeria (LOS)",
            "city": "Lagos",
            "country": "Nigeria",
            "iata": "LOS",
            "airport": "Murtala Muhammed International Airport"
          },
          {
            "label": "Oslo, Norway (OSL)",
            "city": "Oslo",
            "country": "Norway",
            "iata": "OSL",
            "airport": "Oslo Gardermoen Airport"
          },
          {
            "label": "Ho Chi Minh City, Vietnam (SGN)",
            "city": "Ho Chi Minh City",
            "country": "Vietnam",
            "iata": "SGN",
            "airport": "Tan Son Nhat International Airport"
          },
          {
            "label": "Oslo, Norway (TRF)",
            "city": "Oslo",
            "country": "Norway",
            "iata": "TRF",
            "airport": "Sandefjord Airport, Torp"
          },
          {
            "label": "Tashkent, Uzbekistan (TAS)",
            "city": "Tashkent",
            "country": "Uzbekistan",
            "iata": "TAS",
            "airport": "Tashkent International Airport"
          },
          {
            "label": "Budapest, Hungary (BUD)",
            "city": "Budapest",
            "country": "Hungary",
            "iata": "BUD",
            "airport": "Budapest Listz Ferenc international Airport"
          },
          {
            "label": "Sao Paulo, Brazil - All Airports (SAO)",
            "city": "Sao Paulo",
            "country": "Brazil",
            "iata": "SAO",
            "airport": "Campo de Marte Airport"
          },
          {
            "label": "Sao Paulo, Brazil (GRU)",
            "city": "Sao Paulo",
            "country": "Brazil",
            "iata": "GRU",
            "airport": "São Paulo International Airport"
          },
          {
            "label": "Sao Paulo, Brazil (CGH)",
            "city": "Sao Paulo",
            "country": "Brazil",
            "iata": "CGH",
            "airport": "Congonhas Airport"
          },
          {
            "label": "Sao Paulo, Brazil (VCP)",
            "city": "Sao Paulo",
            "country": "Brazil",
            "iata": "VCP",
            "airport": "Viracopos International Airport"
          },
          {
            "label": "Edmonton, Canada (YEG)",
            "city": "Edmonton",
            "country": "Canada",
            "iata": "YEG",
            "airport": "Edmonton International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Mahe Island, Seychelles (SEZ)",
            "city": "Mahe Island",
            "country": "Seychelles",
            "iata": "SEZ",
            "airport": "Seychelles International Airport"
          },
          {
            "label": "Charlotte, US (CLT)",
            "city": "Charlotte",
            "country": "US",
            "iata": "CLT",
            "airport": "Charlotte Douglas International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Osaka, Japan (KIX)",
            "city": "Osaka",
            "country": "Japan",
            "iata": "KIX",
            "airport": "Kansai International Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Osaka, Japan (ITM)",
            "city": "Osaka",
            "country": "Japan",
            "iata": "ITM",
            "airport": "Osaka International Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Kabul, Afghanistan (KBL)",
            "city": "Kabul",
            "country": "Afghanistan",
            "iata": "KBL",
            "airport": "Kabul International Airport",
            "currency_code": "AFN"
          },
          {
            "label": "Lisbon, Portugal (LIS)",
            "city": "Lisbon",
            "country": "Portugal",
            "iata": "LIS",
            "airport": "Lisbon Portela Airport"
          },
          {
            "label": "Ludhiana, India (LUH)",
            "city": "Ludhiana",
            "country": "India",
            "iata": "LUH",
            "airport": "Ludhiana Airport",
            "currency_code": "INR"
          },
          {
            "label": "Hanoi, Vietnam (HAN)",
            "city": "Hanoi",
            "country": "Vietnam",
            "iata": "HAN",
            "airport": "Noi Bai International Airport"
          },
          {
            "label": "Adelaide, Australia (ADL)",
            "city": "Adelaide",
            "country": "Australia",
            "iata": "ADL",
            "airport": "Adelaide International Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Pittsburgh, US (PIT)",
            "city": "Pittsburgh",
            "country": "US",
            "iata": "PIT",
            "airport": "Pittsburgh International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Macau, Macao (MFM)",
            "city": "Macau",
            "country": "Macao",
            "iata": "MFM",
            "airport": "Macau International Airport"
          },
          {
            "label": "Warsaw, Poland (WAW)",
            "city": "Warsaw",
            "country": "Poland",
            "iata": "WAW",
            "airport": "Warsaw Chopin Airport"
          },
          {
            "label": "Amman - Marka Intl Apt, Jordan (ADJ)",
            "city": "Amman",
            "country": "Jordan",
            "iata": "ADJ",
            "airport": "Amman-Marka International Airport",
            "currency_code": "JOD"
          },
          {
            "label": "Amman - Queen Alia Intl Apt, Jordan (AMM)",
            "city": "Amman",
            "country": "Jordan",
            "iata": "AMM",
            "airport": "Queen Alia International Airport",
            "currency_code": "JOD"
          },
          {
            "label": "Gaya, India (GAY)",
            "city": "Gaya",
            "country": "India",
            "iata": "GAY",
            "airport": "Gaya Airport",
            "currency_code": "INR"
          },
          {
            "label": "Glasgow, UK (GLA)",
            "city": "Glasgow",
            "country": "UK",
            "iata": "GLA",
            "airport": "Glasgow International Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Glasgow, UK (PIK)",
            "city": "Glasgow",
            "country": "UK",
            "iata": "PIK",
            "airport": "Glasgow Prestwick Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Glasgow, US (GGW)",
            "city": "Glasgow",
            "country": "US",
            "iata": "GGW",
            "airport": "Wokal Field Glasgow International Airport",
            "currency_code": "USD"
          },
          {
            "label": "San Diego, US (SAN)",
            "city": "San Diego",
            "country": "US",
            "iata": "SAN",
            "airport": "San Diego International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Hamburg, Germany (HAM)",
            "city": "Hamburg",
            "country": "Germany",
            "iata": "HAM",
            "airport": "Hamburg Airport"
          },
          {
            "label": "Tobago, Trinidad and Tobago (TAB)",
            "city": "Tobago",
            "country": "Trinidad and Tobago",
            "iata": "TAB",
            "airport": "Tobago-Crown Point Airport"
          },
          {
            "label": "Phnom Penh, Cambodia (PNH)",
            "city": "Phnom Penh",
            "country": "Cambodia",
            "iata": "PNH",
            "airport": "Phnom Penh International Airport"
          },
          {
            "label": "Mexico City, Mexico (MEX)",
            "city": "Mexico City",
            "country": "Mexico",
            "iata": "MEX",
            "airport": "Licenciado Benito Juarez International Airport"
          },
          {
            "label": "Edinburgh, UK (EDI)",
            "city": "Edinburgh",
            "country": "UK",
            "iata": "EDI",
            "airport": "Edinburgh Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Denver, US (DEN)",
            "city": "Denver",
            "country": "US",
            "iata": "DEN",
            "airport": "Denver International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Sholapur, India (SSE)",
            "city": "Sholapur",
            "country": "India",
            "iata": "SSE",
            "airport": "Solapur Airport",
            "currency_code": "INR"
          },
          {
            "label": "San Jose, Costa Rica (SJO)",
            "city": "San Jose",
            "country": "Costa Rica",
            "iata": "SJO",
            "airport": "Juan Santamaria International Airport"
          },
          {
            "label": "San Jose, Philippines (SJI)",
            "city": "San Jose",
            "country": "Philippines",
            "iata": "SJI",
            "airport": "San Jose Airport"
          },
          {
            "label": "San Jose, US (SJC)",
            "city": "San Jose",
            "country": "US",
            "iata": "SJC",
            "airport": "Norman Y. Mineta San Jose International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Accra, Ghana (ACC)",
            "city": "Accra",
            "country": "Ghana",
            "iata": "ACC",
            "airport": "Kotoka International Airport"
          },
          {
            "label": "Wellington, New Zealand (WLG)",
            "city": "Wellington",
            "country": "New Zealand",
            "iata": "WLG",
            "airport": "Wellington International Airport"
          },
          {
            "label": "Addis Ababa, Ethiopia (ADD)",
            "city": "Addis Ababa",
            "country": "Ethiopia",
            "iata": "ADD",
            "airport": "Bole International Airport"
          },
          {
            "label": "Christchurch, New Zealand (CHC)",
            "city": "Christchurch",
            "country": "New Zealand",
            "iata": "CHC",
            "airport": "Christchurch International Airport"
          },
          {
            "label": "Nadi, Fiji (NAN)",
            "city": "Nadi",
            "country": "Fiji",
            "iata": "NAN",
            "airport": "Nadi International Airport"
          },
          {
            "label": "Balikpapan, Indonesia (BPN)",
            "city": "Balikpapan",
            "country": "Indonesia",
            "iata": "BPN",
            "airport": "Sepinggan International Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Stuttgart, Germany (STR)",
            "city": "Stuttgart",
            "country": "Germany",
            "iata": "STR",
            "airport": "Stuttgart Airport"
          },
          {
            "label": "Hannover, Germany (HAJ)",
            "city": "Hannover",
            "country": "Germany",
            "iata": "HAJ",
            "airport": "Hannover Airport"
          },
          {
            "label": "Saint Petersburg, Russia (LED)",
            "city": "Saint Petersburg",
            "country": "Russia",
            "iata": "LED",
            "airport": "Pulkovo Airport"
          },
          {
            "label": "Saint Petersburg, US (PIE)",
            "city": "Saint Petersburg",
            "country": "US",
            "iata": "PIE",
            "airport": "St Petersburg Clearwater International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Nassau, Bahamas (NAS)",
            "city": "Nassau",
            "country": "Bahamas",
            "iata": "NAS",
            "airport": "Lynden Pindling International Airport"
          },
          {
            "label": "Siliguri, India  (nearest airport Bagdogra, IXB)",
            "city": "Siliguri",
            "country": "India",
            "iata": "IXB",
            "airport": "Bagdogra Airport",
            "currency_code": "INR"
          },
          {
            "label": "Shimla, India (SLV)",
            "city": "Shimla",
            "country": "India",
            "iata": "SLV",
            "airport": "Shimla Airport",
            "currency_code": "INR"
          },
          {
            "label": "Winnipeg, Canada (YWG)",
            "city": "Winnipeg",
            "country": "Canada",
            "iata": "YWG",
            "airport": "Winnipeg / James Armstrong Richardson International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Almaty, Kazakhstan (ALA)",
            "city": "Almaty",
            "country": "Kazakhstan",
            "iata": "ALA",
            "airport": "Almaty Airport"
          },
          {
            "label": "Luanda, Angola (LAD)",
            "city": "Luanda",
            "country": "Angola",
            "iata": "LAD",
            "airport": "Quatro De Fevereiro Airport",
            "currency_code": "AOA"
          },
          {
            "label": "Lombok, Indonesia (LOP)",
            "city": "Lombok",
            "country": "Indonesia",
            "iata": "LOP",
            "airport": "Bandara International Lombok Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Kunming, China (KMG)",
            "city": "Kunming",
            "country": "China",
            "iata": "KMG",
            "airport": "Kunming Wujiaba International Airport"
          },
          {
            "label": "Latur, India (LTU)",
            "city": "Latur",
            "country": "India",
            "iata": "LTU",
            "airport": "Murod Kond Airport",
            "currency_code": "INR"
          },
          {
            "label": "Odessa, Ukraine (ODS)",
            "city": "Odessa",
            "country": "Ukraine",
            "iata": "ODS",
            "airport": "Odessa International Airport"
          },
          {
            "label": "Kolhapur, India (KLH)",
            "city": "Kolhapur",
            "country": "India",
            "iata": "KLH",
            "airport": "Kolhapur Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kigali, Rwanda (KGL)",
            "city": "Kigali",
            "country": "Rwanda",
            "iata": "KGL",
            "airport": "Kigali International Airport"
          },
          {
            "label": "Honolulu - Hawaii, US (HNL)",
            "city": "Honolulu",
            "country": "US",
            "iata": "HNL",
            "airport": "Honolulu International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Entebbe, Uganda (EBB)",
            "city": "Entebbe",
            "country": "Uganda",
            "iata": "EBB",
            "airport": "Entebbe International Airport"
          },
          {
            "label": "Durban, South Africa (DUR)",
            "city": "Durban",
            "country": "South Africa",
            "iata": "DUR",
            "airport": "King Shaka International Airport"
          },
          {
            "label": "Indianapolis, US (IND)",
            "city": "Indianapolis",
            "country": "US",
            "iata": "IND",
            "airport": "Indianapolis International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Ottawa, Canada (YOW)",
            "city": "Ottawa",
            "country": "Canada",
            "iata": "YOW",
            "airport": "Ottawa Macdonald-Cartier International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Nice, France (NCE)",
            "city": "Nice",
            "country": "France",
            "iata": "NCE",
            "airport": ""
          },
          {
            "label": "Bucharest, Romania (OTP)",
            "city": "Bucharest",
            "country": "Romania",
            "iata": "OTP",
            "airport": "Henri Coanda International Airport",
            "currency_code": "RON"
          },
          {
            "label": "Bucharest, Romania (BBU)",
            "city": "Bucharest",
            "country": "Romania",
            "iata": "BBU",
            "airport": "Baneasa International Airport",
            "currency_code": "RON"
          },
          {
            "label": "Buffalo, US (BUF)",
            "city": "Buffalo",
            "country": "US",
            "iata": "BUF",
            "airport": "Buffalo Niagara International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Busan, South Korea (PUS)",
            "city": "Busan",
            "country": "South Korea",
            "iata": "PUS",
            "airport": "Gimhae International Airport"
          },
          {
            "label": "Tbilisi, Georgia (TBS)",
            "city": "Tbilisi",
            "country": "Georgia",
            "iata": "TBS",
            "airport": "Tbilisi International Airport"
          },
          {
            "label": "Tampa, US (TPA)",
            "city": "Tampa",
            "country": "US",
            "iata": "TPA",
            "airport": "Tampa International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Shenzhen, China (SZX)",
            "city": "Shenzhen",
            "country": "China",
            "iata": "SZX",
            "airport": "Shenzhen Bao'an International Airport"
          },
          {
            "label": "Lusaka, Zambia (LUN)",
            "city": "Lusaka",
            "country": "Zambia",
            "iata": "LUN",
            "airport": "Lusaka International Airport"
          },
          {
            "label": "Cleveland, US (CLE)",
            "city": "Cleveland",
            "country": "US",
            "iata": "CLE",
            "airport": "Cleveland Hopkins International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Newcastle, Australia (NTL)",
            "city": "Newcastle",
            "country": "Australia",
            "iata": "NTL",
            "airport": "Newcastle Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Newcastle, UK (NCL)",
            "city": "Newcastle",
            "country": "UK",
            "iata": "NCL",
            "airport": "Newcastle Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Portland, US (PDX)",
            "city": "Portland",
            "country": "US",
            "iata": "PDX",
            "airport": "Portland International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Portland, US (PWM)",
            "city": "Portland",
            "country": "US",
            "iata": "PWM",
            "airport": "Portland International Jetport Airport",
            "currency_code": "USD"
          },
          {
            "label": "Austin, US (AUS)",
            "city": "Austin",
            "country": "US",
            "iata": "AUS",
            "airport": "Austin Bergstrom International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Cincinnati, US (CVG)",
            "city": "Cincinnati",
            "country": "US",
            "iata": "CVG",
            "airport": "Cincinnati Northern Kentucky International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Madinah, Saudi Arabia (MED)",
            "city": "Madinah",
            "country": "Saudi Arabia",
            "iata": "MED",
            "airport": "Prince Mohammad Bin Abdulaziz Airport"
          },
          {
            "label": "Buenos Aires, Argentina (AEP)",
            "city": "Buenos Aires",
            "country": "Argentina",
            "iata": "AEP",
            "airport": "Jorge Newbery Airpark",
            "currency_code": "ARS"
          },
          {
            "label": "Buenos Aires, Argentina (EZE)",
            "city": "Buenos Aires",
            "country": "Argentina",
            "iata": "EZE",
            "airport": "Ministro Pistarini International Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Douala, Cameroon (DLA)",
            "city": "Douala",
            "country": "Cameroon",
            "iata": "DLA",
            "airport": "Douala International Airport"
          },
          {
            "label": "Conakry, Guinea (CKY)",
            "city": "Conakry",
            "country": "Guinea",
            "iata": "CKY",
            "airport": "Conakry Airport"
          },
          {
            "label": "Bangkok, Thailand - Don Mueang Apt (DMK)",
            "city": "Bangkok",
            "country": "Thailand",
            "iata": "DMK",
            "airport": "Don Mueang International Airport",
            "currency_code": "THB"
          },
          {
            "label": "Antigua, Antigua (ANU)",
            "city": "Antigua",
            "country": "Antigua",
            "iata": "ANU",
            "airport": "V.C. Bird International Airport"
          },
          {
            "label": "Abuja, Nigeria (ABV)",
            "city": "Abuja",
            "country": "Nigeria",
            "iata": "ABV",
            "airport": "Nnamdi Azikiwe International Airport"
          },
          {
            "label": "Ajmer, India  (nearest airport Jaipur, JAI)",
            "city": "Ajmer",
            "country": "India",
            "iata": "JAI",
            "airport": "Jaipur International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Alleppey, India  (nearest airport Cochin, COK)",
            "city": "Alleppey",
            "country": "India",
            "iata": "COK",
            "airport": "Cochin International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Udupi, India  (nearest airport Mangalore, IXE)",
            "city": "Udupi",
            "country": "India",
            "iata": "IXE",
            "airport": "Mangalore International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Ooty, India  (nearest airport Coimbatore, CJB)",
            "city": "Ooty",
            "country": "India",
            "iata": "CJB",
            "airport": "Coimbatore International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Katra, India (nearest airport Jammu, IXJ)",
            "city": "Katra",
            "country": "India",
            "iata": "IXJ",
            "airport": "Jammu Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kanyakumari, India  (nearest airport Trivandrum, TRV)",
            "city": "Kanyakumari",
            "country": "India",
            "iata": "TRV",
            "airport": "Trivandrum International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kasauli, India  (nearest airport Chandigarh, IXC)",
            "city": "Kasauli",
            "country": "India",
            "iata": "IXC",
            "airport": "Chandigarh Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kandla, India (IXY)",
            "city": "Kandla",
            "country": "India",
            "iata": "IXY",
            "airport": "Kandla Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kumarakom, India  (nearest airport Cochin, COK)",
            "city": "Kumarakom",
            "country": "India",
            "iata": "COK",
            "airport": "Cochin International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Coorg, India  (nearest airport Mysore, MYQ)",
            "city": "Coorg",
            "country": "India",
            "iata": "MYQ",
            "airport": "Mysore Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kerela, India  (nearest airport Calicut, CCJ)",
            "city": "Kerela",
            "country": "India",
            "iata": "CCJ",
            "airport": "Calicut International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Corbett, India  (nearest airport Dehradun, DED)",
            "city": "Corbett",
            "country": "India",
            "iata": "DED",
            "airport": "Dehradun Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kodaikanal, India (nearest airport Madurai, IXM)",
            "city": "Kodaikanal",
            "country": "India",
            "iata": "IXM",
            "airport": "Madurai Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kolhapur, India  (nearest airport Pune, PNQ)",
            "city": "Kolhapur",
            "country": "India",
            "iata": "PNQ",
            "airport": "Pune Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kovalam, India  (nearest airport Trivandrum, TRV)",
            "city": "Kovalam",
            "country": "India",
            "iata": "TRV",
            "airport": "Trivandrum International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Kausani, India  (nearest airport Pantnagar, PGH)",
            "city": "Kausani",
            "country": "India",
            "iata": "PGH",
            "airport": "Pantnagar Airport",
            "currency_code": "INR"
          },
          {
            "label": "Gangtok, India  (nearest airport Bagdogra, IXB)",
            "city": "Gangtok",
            "country": "India",
            "iata": "IXB",
            "airport": "Bagdogra Airport",
            "currency_code": "INR"
          },
          {
            "label": "Gurgaon, India  (nearest airport New Delhi, DEL)",
            "city": "Gurgaon",
            "country": "India",
            "iata": "DEL",
            "airport": "Indira Gandhi International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Guruvayoor, India  (nearest airport Cochin, COK)",
            "city": "Guruvayoor",
            "country": "India",
            "iata": "COK",
            "airport": "Cochin International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Gulmarg, India  (nearest airport Jammu, IXJ)",
            "city": "Gulmarg",
            "country": "India",
            "iata": "IXJ",
            "airport": "Jammu Airport",
            "currency_code": "INR"
          },
          {
            "label": "Jamshedpur, India (IXW)",
            "city": "Jamshedpur",
            "country": "India",
            "iata": "IXW",
            "airport": "Jamshedpur Airport",
            "currency_code": "INR"
          },
          {
            "label": "Jaisalmer, India  (JSA)",
            "city": "Jaisalmer",
            "country": "India",
            "iata": "JSA",
            "airport": "Jaisalmer Airport",
            "currency_code": "INR"
          },
          {
            "label": "Dalhousie, India  (nearest airport Dharamshala, DHM)",
            "city": "Dalhousie",
            "country": "India",
            "iata": "DHM",
            "airport": "Kangra Airport",
            "currency_code": "INR"
          },
          {
            "label": "Dindigul, India  (nearest airport Madurai, IXM)",
            "city": "Dindigul",
            "country": "India",
            "iata": "IXM",
            "airport": "Madurai Airport",
            "currency_code": "INR"
          },
          {
            "label": "Tiruchirapalli, India (TRZ)",
            "city": "Tiruchirapalli",
            "country": "India",
            "iata": "TRZ",
            "airport": "Tiruchirapally Civil Airport Airport",
            "currency_code": "INR"
          },
          {
            "label": "Tezpur, India (TEZ)",
            "city": "Tezpur",
            "country": "India",
            "iata": "TEZ",
            "airport": "Tezpur Airport",
            "currency_code": "INR"
          },
          {
            "label": "Thekkady, India  (nearest airport Madurai, IXM)",
            "city": "Thekkady",
            "country": "India",
            "iata": "IXM",
            "airport": "Madurai Airport",
            "currency_code": "INR"
          },
          {
            "label": "Daman, India  (nearest airport Mumbai, BOM)",
            "city": "Daman",
            "country": "India",
            "iata": "BOM",
            "airport": "Chhatrapati Shivaji International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Digha, India  (nearest airport Kolkata, CCU)",
            "city": "Digha",
            "country": "India",
            "iata": "CCU",
            "airport": "Netaji Subhash Chandra Bose International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Diu, India (DIU)",
            "city": "Diu",
            "country": "India",
            "iata": "DIU",
            "airport": "Diu Airport",
            "currency_code": "INR"
          },
          {
            "label": "Dwarka, India  (nearest airport Porbandar, PBD)",
            "city": "Dwarka",
            "country": "India",
            "iata": "PBD",
            "airport": "Porbandar Airport",
            "currency_code": "INR"
          },
          {
            "label": "Nasik, India (ISK)",
            "city": "Nasik",
            "country": "India",
            "iata": "ISK",
            "airport": "Gandhinagar Airport",
            "currency_code": "INR"
          },
          {
            "label": "Nainital, India  (nearest airport Pantnagar, PGH)",
            "city": "Nainital",
            "country": "India",
            "iata": "PGH",
            "airport": "Pantnagar Airport",
            "currency_code": "INR"
          },
          {
            "label": "Noida, India  (nearest airport New Delhi, DEL)",
            "city": "Noida",
            "country": "India",
            "iata": "DEL",
            "airport": "Indira Gandhi International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Pantnagar, India (PGH)",
            "city": "Pantnagar",
            "country": "India",
            "iata": "PGH",
            "airport": "Pantnagar Airport",
            "currency_code": "INR"
          },
          {
            "label": "Pathankot, India (IXP)",
            "city": "Pathankot",
            "country": "India",
            "iata": "IXP",
            "airport": "Pathankot Air Force Station",
            "currency_code": "INR"
          },
          {
            "label": "Pahalgam, India  (nearest airport Srinagar, SXR)",
            "city": "Pahalgam",
            "country": "India",
            "iata": "SXR",
            "airport": "Sheikh ul Alam Airport",
            "currency_code": "INR"
          },
          {
            "label": "Pelling, India  (nearest airport Bagdogra, IXB)",
            "city": "Pelling",
            "country": "India",
            "iata": "IXB",
            "airport": "Bagdogra Airport",
            "currency_code": "INR"
          },
          {
            "label": "Puri, India  (nearest airport Bhubaneshwar, BBI)",
            "city": "Puri",
            "country": "India",
            "iata": "BBI",
            "airport": "Biju Patnaik Airport",
            "currency_code": "INR"
          },
          {
            "label": "Faridabad, India  (nearest airport New Delhi, DEL)",
            "city": "Faridabad",
            "country": "India",
            "iata": "DEL",
            "airport": "Indira Gandhi International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Bellary, India (BEP)",
            "city": "Bellary",
            "country": "India",
            "iata": "BEP",
            "airport": "Bellary Airport",
            "currency_code": "INR"
          },
          {
            "label": "Margao, India  (nearest airport Goa, GOI)",
            "city": "Margao",
            "country": "India",
            "iata": "GOI",
            "airport": "Dabolim Airport",
            "currency_code": "INR"
          },
          {
            "label": "Mussorie, India  (nearest airport Dehradun, DED)",
            "city": "Mussorie",
            "country": "India",
            "iata": "DED",
            "airport": "Dehradun Airport",
            "currency_code": "INR"
          },
          {
            "label": "Mahabaleshwar, India  (nearest airport Pune, PNQ)",
            "city": "Mahabaleshwar",
            "country": "India",
            "iata": "PNQ",
            "airport": "Pune Airport",
            "currency_code": "INR"
          },
          {
            "label": "Mount Abu, India  (nearest airport Udaipur, UDR)",
            "city": "Mount Abu",
            "country": "India",
            "iata": "UDR",
            "airport": "Maharana Pratap Airport",
            "currency_code": "INR"
          },
          {
            "label": "Matheran, India  (nearest airport Mumbai, BOM)",
            "city": "Matheran",
            "country": "India",
            "iata": "BOM",
            "airport": "Chhatrapati Shivaji International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Munnar, India  (nearest airport Cochin, COK)",
            "city": "Munnar",
            "country": "India",
            "iata": "COK",
            "airport": "Cochin International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Yercaud, India  (nearest airport Tiruchirapalli, TRZ)",
            "city": "Yercaud",
            "country": "India",
            "iata": "TRZ",
            "airport": "Tiruchirapally Civil Airport Airport",
            "currency_code": "INR"
          },
          {
            "label": "Ranthambore, India  (nearest airport Jaipur, JAI)",
            "city": "Ranthambore",
            "country": "India",
            "iata": "JAI",
            "airport": "Jaipur International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Rameswaram, India  (nearest airport Madurai, IXM)",
            "city": "Rameswaram",
            "country": "India",
            "iata": "IXM",
            "airport": "Madurai Airport",
            "currency_code": "INR"
          },
          {
            "label": "Ropar, India  (nearest airport Chandigarh, IXC)",
            "city": "Ropar",
            "country": "India",
            "iata": "IXC",
            "airport": "Chandigarh Airport",
            "currency_code": "INR"
          },
          {
            "label": "Ladakh, India  (nearest airport Leh, IXL)",
            "city": "Ladakh",
            "country": "India",
            "iata": "IXL",
            "airport": "Leh Kushok Bakula Rimpochee Airport",
            "currency_code": "INR"
          },
          {
            "label": "Lavasa, India  (nearest airport Mumbai, BOM)",
            "city": "Lavasa",
            "country": "India",
            "iata": "BOM",
            "airport": "Chhatrapati Shivaji International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Latur, India  (nearest airport Nanded, NDC)",
            "city": "Latur",
            "country": "India",
            "iata": "NDC",
            "airport": "Nanded Airport",
            "currency_code": "INR"
          },
          {
            "label": "Lilabari, India (IXI)",
            "city": "Lilabari",
            "country": "India",
            "iata": "IXI",
            "airport": "North Lakhimpur Airport",
            "currency_code": "INR"
          },
          {
            "label": "Leh, India (IXL)",
            "city": "Leh",
            "country": "India",
            "iata": "IXL",
            "airport": "Leh Kushok Bakula Rimpochee Airport",
            "currency_code": "INR"
          },
          {
            "label": "Lonavala, India  (nearest airport Mumbai, BOM)",
            "city": "Lonavala",
            "country": "India",
            "iata": "BOM",
            "airport": "Chhatrapati Shivaji International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Wayanad, India  (nearest airport Calicut, CCJ)",
            "city": "Wayanad",
            "country": "India",
            "iata": "CCJ",
            "airport": "Calicut International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Velankanni, India  (nearest airport Tiruchirapalli, TRZ)",
            "city": "Velankanni",
            "country": "India",
            "iata": "TRZ",
            "airport": "Tiruchirapally Civil Airport Airport",
            "currency_code": "INR"
          },
          {
            "label": "Shirdi, India (nearest airport Nasik, ISK)",
            "city": "Shirdi",
            "country": "India",
            "iata": "ISK",
            "airport": "Gandhinagar Airport",
            "currency_code": "INR"
          },
          {
            "label": "Shillong, India (SHL)",
            "city": "Shillong",
            "country": "India",
            "iata": "SHL",
            "airport": "Shillong Airport",
            "currency_code": "INR"
          },
          {
            "label": "Sholapur, India  (nearest airport Pune, PNQ)",
            "city": "Sholapur",
            "country": "India",
            "iata": "PNQ",
            "airport": "Pune Airport",
            "currency_code": "INR"
          },
          {
            "label": "Salem, India (SXV)",
            "city": "Salem",
            "country": "India",
            "iata": "SXV",
            "airport": "Salem Airport",
            "currency_code": "INR"
          },
          {
            "label": "Sawai Madhopur, India  (nearest airport Jaipur, JAI)",
            "city": "Sawai Madhopur",
            "country": "India",
            "iata": "JAI",
            "airport": "Jaipur International Airport",
            "currency_code": "INR"
          },
          {
            "label": "Sikkim, India  (nearest airport Bagdogra, IXB)",
            "city": "Sikkim",
            "country": "India",
            "iata": "IXB",
            "airport": "Bagdogra Airport",
            "currency_code": "INR"
          },
          {
            "label": "Al Ain, UAE (AAN)",
            "city": "Al Ain",
            "country": "UAE",
            "iata": "AAN",
            "airport": "Al Ain International Airport",
          },
          {
            "label": "Ras Al Khaimah, UAE (RKT)",
            "city": "Ras Al Khaimah",
            "country": "UAE",
            "iata": "RKT",
            "airport": "Ras Al Khaimah International Airport"
          },
          {
            "label": "Aalborg, Denmark (AAL)",
            "city": "Aalborg",
            "country": "Denmark",
            "iata": "AAL",
            "airport": "Aalborg Airport"
          },
          {
            "label": "Aalesund, Norway (AES)",
            "city": "Aalesund",
            "country": "Norway",
            "iata": "AES",
            "airport": ""
          },
          {
            "label": "Aarhus, Denmark (AAR)",
            "city": "Aarhus",
            "country": "Denmark",
            "iata": "AAR",
            "airport": "Aarhus Airport"
          },
          {
            "label": "Aasiaat, Greenland (JEG)",
            "city": "Aasiaat",
            "country": "Greenland",
            "iata": "JEG",
            "airport": "Aasiaat Airport"
          },
          {
            "label": "Abakan, Russia (ABA)",
            "city": "Abakan",
            "country": "Russia",
            "iata": "ABA",
            "airport": "Abakan Airport"
          },
          {
            "label": "Abbotsford, Canada (YXX)",
            "city": "Abbotsford",
            "country": "Canada",
            "iata": "YXX",
            "airport": "Abbotsford Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Abecher, Chad (AEH)",
            "city": "Abecher",
            "country": "Chad",
            "iata": "AEH",
            "airport": "Abeche Airport"
          },
          {
            "label": "Aberdeen, UK (ABZ)",
            "city": "Aberdeen",
            "country": "UK",
            "iata": "ABZ",
            "airport": "Aberdeen Dyce Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Aberdeen, US (ABR)",
            "city": "Aberdeen",
            "country": "US",
            "iata": "ABR",
            "airport": "Aberdeen Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Abha, Saudi Arabia (AHB)",
            "city": "Abha",
            "country": "Saudi Arabia",
            "iata": "AHB",
            "airport": "Abha Regional Airport"
          },
          {
            "label": "Abilene, US (ABI)",
            "city": "Abilene",
            "country": "US",
            "iata": "ABI",
            "airport": "Abilene Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Abu Simbel, Egypt (ABS)",
            "city": "Abu Simbel",
            "country": "Egypt",
            "iata": "ABS",
            "airport": "Abu Simbel Airport"
          },
          {
            "label": "Acapulco, Mexico (ACA)",
            "city": "Acapulco",
            "country": "Mexico",
            "iata": "ACA",
            "airport": "General Juan N Alvarez International Airport"
          },
          {
            "label": "Acarigua, Venezuela (AGV)",
            "city": "Acarigua",
            "country": "Venezuela",
            "iata": "AGV",
            "airport": "Oswaldo Guevara Mujica Airport"
          },
          {
            "label": "Adak Island, US (ADK)",
            "city": "Adak Island",
            "country": "US",
            "iata": "ADK",
            "airport": "Adak Airport",
            "currency_code": "USD"
          },
          {
            "label": "Adana, Turkey (ADA)",
            "city": "Adana",
            "country": "Turkey",
            "iata": "ADA",
            "airport": "Adana Airport"
          },
          {
            "label": "Aden, Yemen (ADE)",
            "city": "Aden",
            "country": "Yemen",
            "iata": "ADE",
            "airport": "Aden International Airport"
          },
          {
            "label": "Adiyaman, Turkey (ADF)",
            "city": "Adiyaman",
            "country": "Turkey",
            "iata": "ADF",
            "airport": "Adiyaman Airport"
          },
          {
            "label": "Adler, Russia (AER)",
            "city": "Adler",
            "country": "Russia",
            "iata": "AER",
            "airport": "Sochi International Airport"
          },
          {
            "label": "Afutara, Solomon Islands (AFT)",
            "city": "Afutara",
            "country": "Solomon Islands",
            "iata": "AFT",
            "airport": "Afutara Aerodrome"
          },
          {
            "label": "Agadir, Morocco (AGA)",
            "city": "Agadir",
            "country": "Morocco",
            "iata": "AGA",
            "airport": "Al Massira Airport"
          },
          {
            "label": "Agen, France (AGF)",
            "city": "Agen",
            "country": "France",
            "iata": "AGF",
            "airport": "Agen-La Garenne Airport"
          },
          {
            "label": "Aguascalientes, Mexico (AGU)",
            "city": "Aguascalientes",
            "country": "Mexico",
            "iata": "AGU",
            "airport": "Jesus Teran International Airport"
          },
          {
            "label": "Aitutaki, Cook Islands (AIT)",
            "city": "Aitutaki",
            "country": "Cook Islands",
            "iata": "AIT",
            "airport": "Aitutaki Airport"
          },
          {
            "label": "Ajaccio, France (AJA)",
            "city": "Ajaccio",
            "country": "France",
            "iata": "AJA",
            "airport": ""
          },
          {
            "label": "Akhiok, US (AKK)",
            "city": "Akhiok",
            "country": "US",
            "iata": "AKK",
            "airport": "Akhiok Airport",
            "currency_code": "USD"
          },
          {
            "label": "Akiak, US (AKI)",
            "city": "Akiak",
            "country": "US",
            "iata": "AKI",
            "airport": "Akiak Airport",
            "currency_code": "USD"
          },
          {
            "label": "Akita, Japan (AXT)",
            "city": "Akita",
            "country": "Japan",
            "iata": "AXT",
            "airport": "Akita Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Aklavik, Canada (LAK)",
            "city": "Aklavik",
            "country": "Canada",
            "iata": "LAK",
            "airport": "Aklavik Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Akron/Canton, US (CAK)",
            "city": "Akron/Canton",
            "country": "US",
            "iata": "CAK",
            "airport": "Akron Canton Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Aksu, China (AKU)",
            "city": "Aksu",
            "country": "China",
            "iata": "AKU",
            "airport": "Aksu Airport"
          },
          {
            "label": "Aktau, Kazakhstan (SCO)",
            "city": "Aktau",
            "country": "Kazakhstan",
            "iata": "SCO",
            "airport": "Aktau Airport"
          },
          {
            "label": "Aktyubinsk, Kazakhstan (AKX)",
            "city": "Aktyubinsk",
            "country": "Kazakhstan",
            "iata": "AKX",
            "airport": "Aktobe Airport"
          },
          {
            "label": "Akulivik, Canada (AKV)",
            "city": "Akulivik",
            "country": "Canada",
            "iata": "AKV",
            "airport": "Akulivik Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Akureyri, Iceland (AEY)",
            "city": "Akureyri",
            "country": "Iceland",
            "iata": "AEY",
            "airport": "Akureyri Airport",
            "currency_code": "ISK",
          },
          {
            "label": "Akutan, US (KQA)",
            "city": "Akutan",
            "country": "US",
            "iata": "KQA",
            "airport": "Akutan Seaplane Base",
            "currency_code": "USD"
          },
          {
            "label": "Al Arish, Egypt (AAC)",
            "city": "Al Arish",
            "country": "Egypt",
            "iata": "AAC",
            "airport": "El Arish International Airport"
          },
          {
            "label": "Al Ghaydah, Yemen (AAY)",
            "city": "Al Ghaydah",
            "country": "Yemen",
            "iata": "AAY",
            "airport": "Al Ghaidah International Airport"
          },
          {
            "label": "Al Hoceima, Morocco (AHU)",
            "city": "Al Hoceima",
            "country": "Morocco",
            "iata": "AHU",
            "airport": "Cherif Al Idrissi Airport"
          },
          {
            "label": "Alahsa, Saudi Arabia (HOF)",
            "city": "Alahsa",
            "country": "Saudi Arabia",
            "iata": "HOF",
            "airport": "Al Ahsa Airport"
          },
          {
            "label": "Alamogordo, US (ALM)",
            "city": "Alamogordo",
            "country": "US",
            "iata": "ALM",
            "airport": "Alamogordo White Sands Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Alamosa, US (ALS)",
            "city": "Alamosa",
            "country": "US",
            "iata": "ALS",
            "airport": "San Luis Valley Regional Bergman Field",
            "currency_code": "USD"
          },
          {
            "label": "Albacete, Spain (ABC)",
            "city": "Albacete",
            "country": "Spain",
            "iata": "ABC",
            "airport": "Albacete-Los Llanos Airport"
          },
          {
            "label": "Al-Baha, Saudi Arabia (ABT)",
            "city": "Al-Baha",
            "country": "Saudi Arabia",
            "iata": "ABT",
            "airport": "Al Baha Airport"
          },
          {
            "label": "Albany, Australia (ALH)",
            "city": "Albany",
            "country": "Australia",
            "iata": "ALH",
            "airport": "Albany Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Albany, US - Dougherty County Apt (ABY)",
            "city": "Albany",
            "country": "US",
            "iata": "ABY",
            "airport": "Southwest Georgia Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Albany, US (ALB)",
            "city": "Albany",
            "country": "US",
            "iata": "ALB",
            "airport": "Albany International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Albuquerque, US (ABQ)",
            "city": "Albuquerque",
            "country": "US",
            "iata": "ABQ",
            "airport": "Albuquerque International Sunport Airport",
            "currency_code": "USD"
          },
          {
            "label": "Albury, Australia (ABX)",
            "city": "Albury",
            "country": "Australia",
            "iata": "ABX",
            "airport": "Albury Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Alderney, UK (ACI)",
            "city": "Alderney",
            "country": "UK",
            "iata": "ACI",
            "airport": "Alderney Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Aleknagik, US (WKK)",
            "city": "Aleknagik",
            "country": "US",
            "iata": "WKK",
            "airport": "Aleknagik / New Airport",
            "currency_code": "USD"
          },
          {
            "label": "Alexandria, Egypt (ALY)",
            "city": "Alexandria",
            "country": "Egypt",
            "iata": "ALY",
            "airport": "El Nouzha Airport"
          },
          {
            "label": "Alexandria, Egypt (HBE)",
            "city": "Alexandria",
            "country": "Egypt",
            "iata": "HBE",
            "airport": "Borg El Arab International Airport"
          },
          {
            "label": "Alexandria, US (AEX)",
            "city": "Alexandria",
            "country": "US",
            "iata": "AEX",
            "airport": "Alexandria International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Alexandroupolis, Greece (AXD)",
            "city": "Alexandroupolis",
            "country": "Greece",
            "iata": "AXD",
            "airport": "Dimokritos Airport"
          },
          {
            "label": "Alghero, Italy (AHO)",
            "city": "Alghero",
            "country": "Italy",
            "iata": "AHO",
            "airport": "Alghero / Fertilia Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Algiers, Algeria (ALG)",
            "city": "Algiers",
            "country": "Algeria",
            "iata": "ALG",
            "airport": "Houari Boumediene Airport",
            "currency_code": "DZD"
          },
          {
            "label": "Alicante, Spain (ALC)",
            "city": "Alicante",
            "country": "Spain",
            "iata": "ALC",
            "airport": "Alicante International Airport"
          },
          {
            "label": "Alice Springs, Australia (ASP)",
            "city": "Alice Springs",
            "country": "Australia",
            "iata": "ASP",
            "airport": "Alice Springs Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Alitak, US (ALZ)",
            "city": "Alitak",
            "country": "US",
            "iata": "ALZ",
            "airport": "Alitak Seaplane Base",
            "currency_code": "USD"
          },
          {
            "label": "Allakaket, US (AET)",
            "city": "Allakaket",
            "country": "US",
            "iata": "AET",
            "airport": "Allakaket Airport",
            "currency_code": "USD"
          },
          {
            "label": "Allentown, US (ABE)",
            "city": "Allentown",
            "country": "US",
            "iata": "ABE",
            "airport": "Lehigh Valley International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Alliance, US (AIA)",
            "city": "Alliance",
            "country": "US",
            "iata": "AIA",
            "airport": "Alliance Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Alluitsup Paa, Greenland (LLU)",
            "city": "Alluitsup Paa",
            "country": "Greenland",
            "iata": "LLU",
            "airport": "Alluitsup Paa Heliport"
          },
          {
            "label": "Alma, Canada (YTF)",
            "city": "Alma",
            "country": "Canada",
            "iata": "YTF",
            "airport": "Alma Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Almeria, Spain (LEI)",
            "city": "Almeria",
            "country": "Spain",
            "iata": "LEI",
            "airport": ""
          },
          {
            "label": "Alor Setar, Malaysia (AOR)",
            "city": "Alor Setar",
            "country": "Malaysia",
            "iata": "AOR",
            "airport": "Sultan Abdul Halim Airport"
          },
          {
            "label": "Alotau, Papua New Guinea (GUR)",
            "city": "Alotau",
            "country": "Papua New Guinea",
            "iata": "GUR",
            "airport": "Gurney Airport"
          },
          {
            "label": "Alpena, US (APN)",
            "city": "Alpena",
            "country": "US",
            "iata": "APN",
            "airport": "Alpena County Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Alta Floresta, Brazil (AFL)",
            "city": "Alta Floresta",
            "country": "Brazil",
            "iata": "AFL",
            "airport": "Alta Floresta Airport"
          },
          {
            "label": "Alta, Norway (ALF)",
            "city": "Alta",
            "country": "Norway",
            "iata": "ALF",
            "airport": "Alta Airport"
          },
          {
            "label": "Altamira, Brazil (ATM)",
            "city": "Altamira",
            "country": "Brazil",
            "iata": "ATM",
            "airport": "Altamira Airport"
          },
          {
            "label": "Altay, China (AAT)",
            "city": "Altay",
            "country": "China",
            "iata": "AAT",
            "airport": "Altay Air Base"
          },
          {
            "label": "Altenrhein, Switzerland (ACH)",
            "city": "Altenrhein",
            "country": "Switzerland",
            "iata": "ACH",
            "airport": "St Gallen Altenrhein Airport"
          },
          {
            "label": "Altoona/Martinsburg, US (AOO)",
            "city": "Altoona/Martinsburg",
            "country": "US",
            "iata": "AOO",
            "airport": "Altoona Blair County Airport",
            "currency_code": "USD"
          },
          {
            "label": "Amami O Shima, Japan (ASJ)",
            "city": "Amami O Shima",
            "country": "Japan",
            "iata": "ASJ",
            "airport": "Amami Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Amarillo, US (AMA)",
            "city": "Amarillo",
            "country": "US",
            "iata": "AMA",
            "airport": "Rick Husband Amarillo International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Ambler, US (ABL)",
            "city": "Ambler",
            "country": "US",
            "iata": "ABL",
            "airport": "Ambler Airport",
            "currency_code": "USD"
          },
          {
            "label": "Ambon, Indonesia (AMQ)",
            "city": "Ambon",
            "country": "Indonesia",
            "iata": "AMQ",
            "airport": "Pattimura Airport, Ambon",
            "currency_code": "IDR"
          },
          {
            "label": "Amboseli, Kenya (ASV)",
            "city": "Amboseli",
            "country": "Kenya",
            "iata": "ASV",
            "airport": "Amboseli Airport"
          },
          {
            "label": "Amderma, Russia (AMV)",
            "city": "Amderma",
            "country": "Russia",
            "iata": "AMV",
            "airport": "Amderma Airport"
          },
          {
            "label": "Amook, US (AOS)",
            "city": "Amook",
            "country": "US",
            "iata": "AOS",
            "airport": "Amook Bay Seaplane Base",
            "currency_code": "USD"
          },
          {
            "label": "Anadyr, Russia (DYR)",
            "city": "Anadyr",
            "country": "Russia",
            "iata": "DYR",
            "airport": "Ugolny Airport"
          },
          {
            "label": "Anahim Lake, Canada (YAA)",
            "city": "Anahim Lake",
            "country": "Canada",
            "iata": "YAA",
            "airport": "Anahim Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Anaktuvuk, US (AKP)",
            "city": "Anaktuvuk",
            "country": "US",
            "iata": "AKP",
            "airport": "Anaktuvuk Pass Airport",
            "currency_code": "USD"
          },
          {
            "label": "Analalava, Madagascar (HVA)",
            "city": "Analalava",
            "country": "Madagascar",
            "iata": "HVA",
            "airport": "Analalava Airport"
          },
          {
            "label": "Anapa, Russia (AAQ)",
            "city": "Anapa",
            "country": "Russia",
            "iata": "AAQ",
            "airport": "Anapa Airport"
          },
          {
            "label": "Anchorage, US (ANC)",
            "city": "Anchorage",
            "country": "US",
            "iata": "ANC",
            "airport": "Ted Stevens Anchorage International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Ancona, Italy (AOI)",
            "city": "Ancona",
            "country": "Italy",
            "iata": "AOI",
            "airport": "Ancona / Falconara Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Andahuaylas, Peru (ANS)",
            "city": "Andahuaylas",
            "country": "Peru",
            "iata": "ANS",
            "airport": "Andahuaylas Airport"
          },
          {
            "label": "Andenes, Norway (ANX)",
            "city": "Andenes",
            "country": "Norway",
            "iata": "ANX",
            "airport": ""
          },
          {
            "label": "Andizhan, Uzbekistan (AZN)",
            "city": "Andizhan",
            "country": "Uzbekistan",
            "iata": "AZN",
            "airport": "Andizhan Airport"
          },
          {
            "label": "Aneityum, Vanuatu (AUY)",
            "city": "Aneityum",
            "country": "Vanuatu",
            "iata": "AUY",
            "airport": "Anelghowhat Airport"
          },
          {
            "label": "Angelholm/Helsingborg, Sweden (AGH)",
            "city": "Angelholm/Helsingborg",
            "country": "Sweden",
            "iata": "AGH",
            "airport": ""
          },
          {
            "label": "Angers, France (ANE)",
            "city": "Angers",
            "country": "France",
            "iata": "ANE",
            "airport": "Angers-Loire Airport"
          },
          {
            "label": "Angling Lake, Canada (YAX)",
            "city": "Angling Lake",
            "country": "Canada",
            "iata": "YAX",
            "airport": "Wapekeka Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Angoon, US (AGN)",
            "city": "Angoon",
            "country": "US",
            "iata": "AGN",
            "airport": "Angoon Seaplane Base",
            "currency_code": "USD"
          },
          {
            "label": "Aniak, US (ANI)",
            "city": "Aniak",
            "country": "US",
            "iata": "ANI",
            "airport": "Aniak Airport",
            "currency_code": "USD"
          },
          {
            "label": "Aniwa, Vanuatu (AWD)",
            "city": "Aniwa",
            "country": "Vanuatu",
            "iata": "AWD",
            "airport": "Aniwa Airport"
          },
          {
            "label": "Anjouan, Comoros (AJN)",
            "city": "Anjouan",
            "country": "Comoros",
            "iata": "AJN",
            "airport": "Ouani Airport"
          },
          {
            "label": "Ankang, China (AKA)",
            "city": "Ankang",
            "country": "China",
            "iata": "AKA",
            "airport": "Ankang Airport"
          },
          {
            "label": "Ankara, Turkey (ESB)",
            "city": "Ankara",
            "country": "Turkey",
            "iata": "ESB",
            "airport": "Esenboga International Airport"
          },
          {
            "label": "Ankavandra, Madagascar (JVA)",
            "city": "Ankavandra",
            "country": "Madagascar",
            "iata": "JVA",
            "airport": "Ankavandra Airport"
          },
          {
            "label": "Annecy, France (NCY)",
            "city": "Annecy",
            "country": "France",
            "iata": "NCY",
            "airport": "Annecy-Haute-Savoie-Mont Blanc Airport"
          },
          {
            "label": "Anqing, China (AQG)",
            "city": "Anqing",
            "country": "China",
            "iata": "AQG",
            "airport": "Anqing Airport"
          },
          {
            "label": "Antalaha, Madagascar (ANM)",
            "city": "Antalaha",
            "country": "Madagascar",
            "iata": "ANM",
            "airport": "Antsirabato Airport"
          },
          {
            "label": "Antalya, Turkey (AYT)",
            "city": "Antalya",
            "country": "Turkey",
            "iata": "AYT",
            "airport": "Antalya International Airport"
          },
          {
            "label": "Antananarivo, Madagascar (TNR)",
            "city": "Antananarivo",
            "country": "Madagascar",
            "iata": "TNR",
            "airport": "Ivato Airport"
          },
          {
            "label": "Antofagasta, Chile (ANF)",
            "city": "Antofagasta",
            "country": "Chile",
            "iata": "ANF",
            "airport": "Cerro Moreno Airport"
          },
          {
            "label": "Antsalova, Madagascar (WAQ)",
            "city": "Antsalova",
            "country": "Madagascar",
            "iata": "WAQ",
            "airport": "Antsalova Airport"
          },
          {
            "label": "Antwerp, Belgium (ANR)",
            "city": "Antwerp",
            "country": "Belgium",
            "iata": "ANR",
            "airport": "Antwerp International Airport (Deurne)"
          },
          {
            "label": "Anvik, US (ANV)",
            "city": "Anvik",
            "country": "US",
            "iata": "ANV",
            "airport": "Anvik Airport",
            "currency_code": "USD"
          },
          {
            "label": "Aomori, Japan (AOJ)",
            "city": "Aomori",
            "country": "Japan",
            "iata": "AOJ",
            "airport": "Aomori Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Aosta, Italy (AOT)",
            "city": "Aosta",
            "country": "Italy",
            "iata": "AOT",
            "airport": "Aosta Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Apartado, Colombia (APO)",
            "city": "Apartado",
            "country": "Colombia",
            "iata": "APO",
            "airport": "",
            "currency_code": "COP"
          },
          {
            "label": "Apia, Samoa (APW)",
            "city": "Apia",
            "country": "Samoa",
            "iata": "APW",
            "airport": "Faleolo International Airport"
          },
          {
            "label": "Appleton, US (ATW)",
            "city": "Appleton",
            "country": "US",
            "iata": "ATW",
            "airport": "Outagamie County Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Aqaba, Jordan (AQJ)",
            "city": "Aqaba",
            "country": "Jordan",
            "iata": "AQJ",
            "airport": "Aqaba King Hussein International Airport",
            "currency_code": "JOD"
          },
          {
            "label": "Aracaju, Brazil (AJU)",
            "city": "Aracaju",
            "country": "Brazil",
            "iata": "AJU",
            "airport": "Santa Maria Airport"
          },
          {
            "label": "AraÃƒÂ§atuba, Brazil (ARU)",
            "city": "AraÃƒÂ§atuba",
            "country": "Brazil",
            "iata": "ARU",
            "airport": "Dario Guarita Airport"
          },
          {
            "label": "Arad, Romania (ARW)",
            "city": "Arad",
            "country": "Romania",
            "iata": "ARW",
            "airport": "Arad International Airport",
            "currency_code": "RON"
          },
          {
            "label": "Araguaina, Brazil (AUX)",
            "city": "Araguaina",
            "country": "Brazil",
            "iata": "AUX",
            "airport": ""
          },
          {
            "label": "Arar, Saudi Arabia (RAE)",
            "city": "Arar",
            "country": "Saudi Arabia",
            "iata": "RAE",
            "airport": "Arar Domestic Airport"
          },
          {
            "label": "Arauca, Colombia (AUC)",
            "city": "Arauca",
            "country": "Colombia",
            "iata": "AUC",
            "airport": "Santiago Perez Airport",
            "currency_code": "COP"
          },
          {
            "label": "Araxa, Brazil (AAX)",
            "city": "Araxa",
            "country": "Brazil",
            "iata": "AAX",
            "airport": ""
          },
          {
            "label": "Arba Mintch, Ethiopia (AMH)",
            "city": "Arba Mintch",
            "country": "Ethiopia",
            "iata": "AMH",
            "airport": "Arba Minch Airport"
          },
          {
            "label": "Arbil, Iraq (EBL)",
            "city": "Arbil",
            "country": "Iraq",
            "iata": "EBL",
            "airport": "Erbil International Airport",
            "currency_code": "IQD"
          },
          {
            "label": "Arcata, US (ACV)",
            "city": "Arcata",
            "country": "US",
            "iata": "ACV",
            "airport": "Arcata Airport",
            "currency_code": "USD"
          },
          {
            "label": "Arctic Village, US (ARC)",
            "city": "Arctic Village",
            "country": "US",
            "iata": "ARC",
            "airport": "Arctic Village Airport",
            "currency_code": "USD"
          },
          {
            "label": "Arequipa, Peru (AQP)",
            "city": "Arequipa",
            "country": "Peru",
            "iata": "AQP",
            "airport": ""
          },
          {
            "label": "Argyle, Australia (GYL)",
            "city": "Argyle",
            "country": "Australia",
            "iata": "GYL",
            "airport": "Argyle Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Arica, Chile (ARI)",
            "city": "Arica",
            "country": "Chile",
            "iata": "ARI",
            "airport": "Chacalluta Airport"
          },
          {
            "label": "Arkhangelsk, Russia (ARH)",
            "city": "Arkhangelsk",
            "country": "Russia",
            "iata": "ARH",
            "airport": "Talagi Airport"
          },
          {
            "label": "Armenia, Colombia (AXM)",
            "city": "Armenia",
            "country": "Colombia",
            "iata": "AXM",
            "airport": "El Eden Airport",
            "currency_code": "COP",
          },
          {
            "label": "Armidale, Australia (ARM)",
            "city": "Armidale",
            "country": "Australia",
            "iata": "ARM",
            "airport": "Armidale Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Arusha, Tanzania (ARK)",
            "city": "Arusha",
            "country": "Tanzania",
            "iata": "ARK",
            "airport": "Arusha Airport"
          },
          {
            "label": "Arviat, Canada (YEK)",
            "city": "Arviat",
            "country": "Canada",
            "iata": "YEK",
            "airport": "Arviat Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Arvidsjaur, Sweden (AJR)",
            "city": "Arvidsjaur",
            "country": "Sweden",
            "iata": "AJR",
            "airport": "Arvidsjaur Airport"
          },
          {
            "label": "Asahikawa, Japan (AKJ)",
            "city": "Asahikawa",
            "country": "Japan",
            "iata": "AKJ",
            "airport": "Asahikawa Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Asheville/Hendersonville, US (AVL)",
            "city": "Asheville/Hendersonville",
            "country": "US",
            "iata": "AVL",
            "airport": "Asheville Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Ashgabat, Turkmenistan (ASB)",
            "city": "Ashgabat",
            "country": "Turkmenistan",
            "iata": "ASB",
            "airport": "Ashgabat Airport"
          },
          {
            "label": "Asmara, Eritrea (ASM)",
            "city": "Asmara",
            "country": "Eritrea",
            "iata": "ASM",
            "airport": "Asmara International Airport"
          },
          {
            "label": "Assiut, Egypt (ATZ)",
            "city": "Assiut",
            "country": "Egypt",
            "iata": "ATZ",
            "airport": "Assiut International Airport"
          },
          {
            "label": "Astana, Kazakhstan (TSE)",
            "city": "Astana",
            "country": "Kazakhstan",
            "iata": "TSE",
            "airport": "Astana International Airport"
          },
          {
            "label": "Astrakhan, Russia (ASF)",
            "city": "Astrakhan",
            "country": "Russia",
            "iata": "ASF",
            "airport": "Astrakhan Airport"
          },
          {
            "label": "Asturias, Spain (OVD)",
            "city": "Asturias",
            "country": "Spain",
            "iata": "OVD",
            "airport": "Asturias Airport"
          },
          {
            "label": "Astypalaia Island, Greece (JTY)",
            "city": "Astypalaia Island",
            "country": "Greece",
            "iata": "JTY",
            "airport": "Astypalaia Airport"
          },
          {
            "label": "Asuncion, Paraguay (ASU)",
            "city": "Asuncion",
            "country": "Paraguay",
            "iata": "ASU",
            "airport": "Silvio Pettirossi International Airport"
          },
          {
            "label": "Aswan, Egypt (ASW)",
            "city": "Aswan",
            "country": "Egypt",
            "iata": "ASW",
            "airport": "Aswan International Airport"
          },
          {
            "label": "Atiu Island, Cook Islands (AIU)",
            "city": "Atiu Island",
            "country": "Cook Islands",
            "iata": "AIU",
            "airport": "Enua Airport"
          },
          {
            "label": "Atka, US (AKB)",
            "city": "Atka",
            "country": "US",
            "iata": "AKB",
            "airport": "Atka Airport",
            "currency_code": "USD"
          },
          {
            "label": "Atlantic City, US (ACY)",
            "city": "Atlantic City",
            "country": "US",
            "iata": "ACY",
            "airport": "Atlantic City International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Atoifi, Solomon Islands (ATD)",
            "city": "Atoifi",
            "country": "Solomon Islands",
            "iata": "ATD",
            "airport": "Uru Harbour Airport"
          },
          {
            "label": "Atqasuk, US (ATK)",
            "city": "Atqasuk",
            "country": "US",
            "iata": "ATK",
            "airport": "Atqasuk Edward Burnell Sr Memorial Airport",
            "currency_code": "USD"
          },
          {
            "label": "Attawapiskat, Canada (YAT)",
            "city": "Attawapiskat",
            "country": "Canada",
            "iata": "YAT",
            "airport": "Attawapiskat Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Atyrau, Kazakhstan (GUW)",
            "city": "Atyrau",
            "country": "Kazakhstan",
            "iata": "GUW",
            "airport": "Atyrau Airport"
          },
          {
            "label": "Augusta, US (AGS)",
            "city": "Augusta",
            "country": "US",
            "iata": "AGS",
            "airport": "Augusta Regional At Bush Field",
            "currency_code": "USD"
          },
          {
            "label": "Augusta, US (AUG)",
            "city": "Augusta",
            "country": "US",
            "iata": "AUG",
            "airport": "Augusta State Airport",
            "currency_code": "USD"
          },
          {
            "label": "Auki, Solomon Islands (AKS)",
            "city": "Auki",
            "country": "Solomon Islands",
            "iata": "AKS",
            "airport": "Auki Airport"
          },
          {
            "label": "Aupaluk, Canada (YPJ)",
            "city": "Aupaluk",
            "country": "Canada",
            "iata": "YPJ",
            "airport": "Aupaluk Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Aurillac, France (AUR)",
            "city": "Aurillac",
            "country": "France",
            "iata": "AUR",
            "airport": "Aurillac Airport"
          },
          {
            "label": "Aurukun Mission, Australia (AUU)",
            "city": "Aurukun Mission",
            "country": "Australia",
            "iata": "AUU",
            "airport": "Aurukun Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Avalon, Australia (AVV)",
            "city": "Avalon",
            "country": "Australia",
            "iata": "AVV",
            "airport": "Avalon Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Avignon, France (AVN)",
            "city": "Avignon",
            "country": "France",
            "iata": "AVN",
            "airport": "Avignon-Caumont Airport"
          },
          {
            "label": "Awaba, Papua New Guinea (AWB)",
            "city": "Awaba",
            "country": "Papua New Guinea",
            "iata": "AWB",
            "airport": "Awaba Airport"
          },
          {
            "label": "Axum, Ethiopia (AXU)",
            "city": "Axum",
            "country": "Ethiopia",
            "iata": "AXU",
            "airport": "Axum Airport"
          },
          {
            "label": "Ayacucho, Peru (AYP)",
            "city": "Ayacucho",
            "country": "Peru",
            "iata": "AYP",
            "airport": "Coronel FAP Alfredo Mendivil Duarte Airport"
          },
          {
            "label": "Ayers Rock, Australia (AYQ)",
            "city": "Ayers Rock",
            "country": "Australia",
            "iata": "AYQ",
            "airport": "Ayers Rock Connellan Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Bacau, Romania (BCM)",
            "city": "Bacau",
            "country": "Romania",
            "iata": "BCM",
            "airport": "Bacau Airport",
            "currency_code": "RON"
          },
          {
            "label": "Bacolod, Philippines (BCD)",
            "city": "Bacolod",
            "country": "Philippines",
            "iata": "BCD",
            "airport": "Bacolod-Silay City International Airport"
          },
          {
            "label": "Badajoz, Spain (BJZ)",
            "city": "Badajoz",
            "country": "Spain",
            "iata": "BJZ",
            "airport": "Badajoz Airport"
          },
          {
            "label": "Badu Island, Australia (BDD)",
            "city": "Badu Island",
            "country": "Australia",
            "iata": "BDD",
            "airport": "Badu Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Bagotville, Canada (YBG)",
            "city": "Bagotville",
            "country": "Canada",
            "iata": "YBG",
            "airport": "CFB Bagotville",
            "currency_code": "CAD"
          },
          {
            "label": "Baguio, Philippines (BAG)",
            "city": "Baguio",
            "country": "Philippines",
            "iata": "BAG",
            "airport": "Loakan Airport"
          },
          {
            "label": "Bahar Dar, Ethiopia (BJR)",
            "city": "Bahar Dar",
            "country": "Ethiopia",
            "iata": "BJR",
            "airport": "Bahir Dar Airport"
          },
          {
            "label": "Bahia Blanca, Argentina (BHI)",
            "city": "Bahia Blanca",
            "country": "Argentina",
            "iata": "BHI",
            "airport": "Comandante Espora Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Bahia Solano, Colombia (BSC)",
            "city": "Bahia Solano",
            "country": "Colombia",
            "iata": "BSC",
            "airport": "",
            "currency_code": "COP"
          },
          {
            "label": "Baia Mare, Romania (BAY)",
            "city": "Baia Mare",
            "country": "Romania",
            "iata": "BAY",
            "airport": "Tautii Magheraus Airport",
            "currency_code": "RON"
          },
          {
            "label": "Baie Comeau, Canada (YBC)",
            "city": "Baie Comeau",
            "country": "Canada",
            "iata": "YBC",
            "airport": "Baie Comeau Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Bakalalan, Malaysia (BKM)",
            "city": "Bakalalan",
            "country": "Malaysia",
            "iata": "BKM",
            "airport": "Bakalalan Airport"
          },
          {
            "label": "Baker Lake, Canada (YBK)",
            "city": "Baker Lake",
            "country": "Canada",
            "iata": "YBK",
            "airport": "Baker Lake Airport",
            "currency_code": "CAD"

          },
          {
            "label": "Bakersfield, US (BFL)",
            "city": "Bakersfield",
            "country": "US",
            "iata": "BFL",
            "airport": "Meadows Field",
            "currency_code": "USD"
          },
          {
            "label": "Baku, Azerbaijan (GYD)",
            "city": "Baku",
            "country": "Azerbaijan",
            "iata": "GYD",
            "airport": "Heydar Aliyev International Airport"
          },
          {
            "label": "Balalae, Solomon Islands (BAS)",
            "city": "Balalae",
            "country": "Solomon Islands",
            "iata": "BAS",
            "airport": "Ballalae Airport"
          },
          {
            "label": "Balimo, Papua New Guinea (OPU)",
            "city": "Balimo",
            "country": "Papua New Guinea",
            "iata": "OPU",
            "airport": "Balimo Airport"
          },
          {
            "label": "Ballina, Australia (BNK)",
            "city": "Ballina",
            "country": "Australia",
            "iata": "BNK",
            "airport": "Ballina Byron Gateway Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Balmaceda, Chile (BBA)",
            "city": "Balmaceda",
            "country": "Chile",
            "iata": "BBA",
            "airport": "Balmaceda Airport"
          },
          {
            "label": "Baltimore, US (BWI)",
            "city": "Baltimore",
            "country": "US",
            "iata": "BWI",
            "airport": "Baltimore/Washington International Thurgood Marshal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Bamaga, Australia (ABM)",
            "city": "Bamaga",
            "country": "Australia",
            "iata": "ABM",
            "airport": "Bamaga Injinoo Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Bamako, Mali (BKO)",
            "city": "Bamako",
            "country": "Mali",
            "iata": "BKO",
            "airport": "Senou Airport"
          },
          {
            "label": "Banda Aceh, Indonesia (BTJ)",
            "city": "Banda Aceh",
            "country": "Indonesia",
            "iata": "BTJ",
            "airport": "Sultan Iskandarmuda Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Bandar Lampung, Indonesia (TKG)",
            "city": "Bandar Lampung",
            "country": "Indonesia",
            "iata": "TKG",
            "airport": "Radin Inten II (Branti) Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Bandar Seri Begawan, Brunei (BWN)",
            "city": "Bandar Seri Begawan",
            "country": "Brunei",
            "iata": "BWN",
            "airport": "Brunei International Airport"
          },
          {
            "label": "Bandung, Indonesia (BDO)",
            "city": "Bandung",
            "country": "Indonesia",
            "iata": "BDO",
            "airport": "Husein Sastranegara International Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Bangda, China (BPX)",
            "city": "Bangda",
            "country": "China",
            "iata": "BPX",
            "airport": "Qamdo Bangda Airport"
          },
          {
            "label": "Pattaya, Thailand  (nearest airport Bangkok, BKK)",
            "city": "Pattaya",
            "country": "Thailand",
            "iata": "BKK",
            "airport": "Suvarnabhumi Airport",
            "currency_code": "THB"
          },
          {
            "label": "Bangor, US (BGR)",
            "city": "Bangor",
            "country": "US",
            "iata": "BGR",
            "airport": "Bangor International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Bangui, Central African Republic (BGF)",
            "city": "Bangui",
            "country": "Central African Republic",
            "iata": "BGF",
            "airport": "Bangui M'Poko International Airport"
          },
          {
            "label": "Banja Luka, Bosnia and Herzegovina (BNX)",
            "city": "Banja Luka",
            "country": "Bosnia and Herzegovina",
            "iata": "BNX",
            "airport": "Banja Luka International Airport"
          },
          {
            "label": "Banjarmasin, Indonesia (BDJ)",
            "city": "Banjarmasin",
            "country": "Indonesia",
            "iata": "BDJ",
            "airport": "Syamsudin Noor Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Banjul, The Gambia (BJL)",
            "city": "Banjul",
            "country": "The Gambia",
            "iata": "BJL",
            "airport": "Banjul International Airport"
          },
          {
            "label": "Banmethuot, Vietnam (BMV)",
            "city": "Banmethuot",
            "country": "Vietnam",
            "iata": "BMV",
            "airport": "Buon Ma Thuot Airport"
          },
          {
            "label": "Baotou, China (BAV)",
            "city": "Baotou",
            "country": "China",
            "iata": "BAV",
            "airport": "Baotou Airport"
          },
          {
            "label": "Bar Harbor, US (BHB)",
            "city": "Bar Harbor",
            "country": "US",
            "iata": "BHB",
            "airport": "Hancock County-Bar Harbor Airport",
            "currency_code": "USD"
          },
          {
            "label": "Barcaldine, Australia (BCI)",
            "city": "Barcaldine",
            "country": "Australia",
            "iata": "BCI",
            "airport": "Barcaldine Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Bardufoss, Norway (BDU)",
            "city": "Bardufoss",
            "country": "Norway",
            "iata": "BDU",
            "airport": "Bardufoss Airport"
          },
          {
            "label": "Bari, Italy (BRI)",
            "city": "Bari",
            "country": "Italy",
            "iata": "BRI",
            "airport": "Bari / Palese International Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Barinas, Venezuela (BNS)",
            "city": "Barinas",
            "country": "Venezuela",
            "iata": "BNS",
            "airport": "Barinas Airport"
          },
          {
            "label": "Bario, Malaysia (BBN)",
            "city": "Bario",
            "country": "Malaysia",
            "iata": "BBN",
            "airport": "Bario Airport"
          },
          {
            "label": "Barnaul, Russia (BAX)",
            "city": "Barnaul",
            "country": "Russia",
            "iata": "BAX",
            "airport": "Barnaul Airport"
          },
          {
            "label": "Barquisimeto, Venezuela (BRM)",
            "city": "Barquisimeto",
            "country": "Venezuela",
            "iata": "BRM",
            "airport": "Barquisimeto International Airport"
          },
          {
            "label": "Barra, UK (BRR)",
            "city": "Barra",
            "country": "UK",
            "iata": "BRR",
            "airport": "Barra Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Barrancabermeja, Colombia (EJA)",
            "city": "Barrancabermeja",
            "country": "Colombia",
            "iata": "EJA",
            "airport": "",
            "currency_code": "COP"
          },
          {
            "label": "Barranquilla, Colombia (BAQ)",
            "city": "Barranquilla",
            "country": "Colombia",
            "iata": "BAQ",
            "airport": "Ernesto Cortissoz International Airport",
            "currency_code": "COP"
          },
          {
            "label": "Barreiras, Brazil (BRA)",
            "city": "Barreiras",
            "country": "Brazil",
            "iata": "BRA",
            "airport": "Barreiras Airport"
          },
          {
            "label": "Barrow in Furness, UK (BWF)",
            "city": "Barrow in Furness",
            "country": "UK",
            "iata": "BWF",
            "airport": "Barrow Walney Island Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Barrow, US (BRW)",
            "city": "Barrow",
            "country": "US",
            "iata": "BRW",
            "airport": "Wiley Post Will Rogers Memorial Airport",
            "currency_code": "USD"
          },
          {
            "label": "Barter Island, US (BTI)",
            "city": "Barter Island",
            "country": "US",
            "iata": "BTI",
            "airport": "Barter Island Lrrs Airport",
            "currency_code": "USD"
          },
          {
            "label": "Basco, Philippines (BSO)",
            "city": "Basco",
            "country": "Philippines",
            "iata": "BSO",
            "airport": "Basco Airport"
          },
          {
            "label": "Basel/Mulhouse, Switzerland (BSL)",
            "city": "Basel/Mulhouse",
            "country": "Switzerland",
            "iata": "BSL",
            "airport": "EuroAirport Basel-Mulhouse-Freiburg Airport"
          },
          {
            "label": "Bastia, France (BIA)",
            "city": "Bastia",
            "country": "France",
            "iata": "BIA",
            "airport": "Bastia-Poretta Airport"
          },
          {
            "label": "Batam, Indonesia (BTH)",
            "city": "Batam",
            "country": "Indonesia",
            "iata": "BTH",
            "airport": "Hang Nadim Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Bathurst, Australia (BHS)",
            "city": "Bathurst",
            "country": "Australia",
            "iata": "BHS",
            "airport": "Bathurst Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Bathurst, Canada (ZBF)",
            "city": "Bathurst",
            "country": "Canada",
            "iata": "ZBF",
            "airport": "Ilford Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Batman, Turkey (BAL)",
            "city": "Batman",
            "country": "Turkey",
            "iata": "BAL",
            "airport": "Batman Airport"
          },
          {
            "label": "Baton Rouge, US (BTR)",
            "city": "Baton Rouge",
            "country": "US",
            "iata": "BTR",
            "airport": "Baton Rouge Metropolitan, Ryan Field",
            "currency_code": "USD"
          },
          {
            "label": "Batumi, Georgia (BUS)",
            "city": "Batumi",
            "country": "Georgia",
            "iata": "BUS",
            "airport": "Batumi International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Bauru, Brazil (BAU)",
            "city": "Bauru",
            "country": "Brazil",
            "iata": "BAU",
            "airport": "Bauru Airport"
          },
          {
            "label": "Bay City/Midland/Saginaw, US (MBS)",
            "city": "Bay City/Midland/Saginaw",
            "country": "US",
            "iata": "MBS",
            "airport": "MBS International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Bazaruto Island, Mozambique (BZB)",
            "city": "Bazaruto Island",
            "country": "Mozambique",
            "iata": "BZB",
            "airport": "Bazaruto Island Airport"
          },
          {
            "label": "Bearskin Lake, Canada (XBE)",
            "city": "Bearskin Lake",
            "country": "Canada",
            "iata": "XBE",
            "airport": "Bearskin Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Beaumont, US (BPT)",
            "city": "Beaumont",
            "country": "US",
            "iata": "BPT",
            "airport": "Southeast Texas Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Beckley, US (BKW)",
            "city": "Beckley",
            "country": "US",
            "iata": "BKW",
            "airport": "Raleigh County Memorial Airport",
            "currency_code": "USD"
          },
          {
            "label": "Bedford/Hanscom, US (BED)",
            "city": "Bedford/Hanscom",
            "country": "US",
            "iata": "BED",
            "airport": "Laurence G Hanscom Field",
            "currency_code": "USD"
          },
          {
            "label": "Bedourie, Australia (BEU)",
            "city": "Bedourie",
            "country": "Australia",
            "iata": "BEU",
            "airport": "Bedourie Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Beihai, China (BHY)",
            "city": "Beihai",
            "country": "China",
            "iata": "BHY",
            "airport": "Beihai Airport"
          },
          {
            "label": "Beira, Mozambique (BEW)",
            "city": "Beira",
            "country": "Mozambique",
            "iata": "BEW",
            "airport": "Beira Airport"
          },
          {
            "label": "Beirut, Lebanon (BEY)",
            "city": "Beirut",
            "country": "Lebanon",
            "iata": "BEY",
            "airport": "Beirut Rafic Hariri International Airport"
          },
          {
            "label": "BelÃƒÂ©m, Brazil (BEL)",
            "city": "BelÃƒÂ©m",
            "country": "Brazil",
            "iata": "BEL",
            "airport": "Val de Cans International Airport"
          },
          {
            "label": "Belep Island, New Caledonia (BMY)",
            "city": "Belep Island",
            "country": "New Caledonia",
            "iata": "BMY",
            "airport": ""
          },
          {
            "label": "Belfast, UK (BFS)",
            "city": "Belfast",
            "country": "UK",
            "iata": "BFS",
            "airport": "Belfast International Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Belfast, UK (BHD)",
            "city": "Belfast",
            "country": "UK",
            "iata": "BHD",
            "airport": "George Best Belfast City Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Belgorod, Russia (EGO)",
            "city": "Belgorod",
            "country": "Russia",
            "iata": "EGO",
            "airport": "Belgorod International Airport"
          },
          {
            "label": "Belgrade, Serbia (BEG)",
            "city": "Belgrade",
            "country": "Serbia",
            "iata": "BEG",
            "airport": "Belgrade Nikola Tesla Airport"
          },
          {
            "label": "Bella Coola, Canada (QBC)",
            "city": "Bella Coola",
            "country": "Canada",
            "iata": "QBC",
            "airport": "Bella Coola Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Bellingham, US (BLI)",
            "city": "Bellingham",
            "country": "US",
            "iata": "BLI",
            "airport": "Bellingham International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Belo Horizonte, Brazil (CNF)",
            "city": "Belo Horizonte",
            "country": "Brazil",
            "iata": "CNF",
            "airport": "Tancredo Neves International Airport"
          },
          {
            "label": "Belo Horizonte, Brazil (PLU)",
            "city": "Belo Horizonte",
            "country": "Brazil",
            "iata": "PLU",
            "airport": "Pampulha - Carlos Drummond de Andrade Airport"
          },
          {
            "label": "Belo, Madagascar (BMD)",
            "city": "Belo",
            "country": "Madagascar",
            "iata": "BMD",
            "airport": "Belo sur Tsiribihina Airport"
          },
          {
            "label": "Benbecula, UK (BEB)",
            "city": "Benbecula",
            "country": "UK",
            "iata": "BEB",
            "airport": "Benbecula Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Bend/Redmond, US (RDM)",
            "city": "Bend/Redmond",
            "country": "US",
            "iata": "RDM",
            "airport": "Roberts Field",
            "currency_code": "USD"
          },
          {
            "label": "Bengkulu, Indonesia (BKS)",
            "city": "Bengkulu",
            "country": "Indonesia",
            "iata": "BKS",
            "airport": "Padang Kemiling (Fatmawati Soekarno) Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Berens River, Canada (YBV)",
            "city": "Berens River",
            "country": "Canada",
            "iata": "YBV",
            "airport": "Berens River Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Bergen, Norway (BGO)",
            "city": "Bergen",
            "country": "Norway",
            "iata": "BGO",
            "airport": "Bergen Airport, Flesland"
          },
          {
            "label": "Bergerac, France (EGC)",
            "city": "Bergerac",
            "country": "France",
            "iata": "EGC",
            "airport": ""
          },
          {
            "label": "Berlevag, Norway (BJF)",
            "city": "Berlevag",
            "country": "Norway",
            "iata": "BJF",
            "airport": ""
          },
          {
            "label": "Berlevag, Norway (BVG)",
            "city": "Berlevag",
            "country": "Norway",
            "iata": "BVG",
            "airport": ""
          },
          {
            "label": "Bern, Switzerland (BRN)",
            "city": "Bern",
            "country": "Switzerland",
            "iata": "BRN",
            "airport": "Bern Belp Airport"
          },
          {
            "label": "Besalampy, Madagascar (BPY)",
            "city": "Besalampy",
            "country": "Madagascar",
            "iata": "BPY",
            "airport": "Besalampy Airport"
          },
          {
            "label": "Bethel, US (BET)",
            "city": "Bethel",
            "country": "US",
            "iata": "BET",
            "airport": "Bethel Airport",
            "currency_code": "USD"
          },
          {
            "label": "Bettles, US (BTT)",
            "city": "Bettles",
            "country": "US",
            "iata": "BTT",
            "airport": "Bettles Airport",
            "currency_code": "USD"
          },
          {
            "label": "Beziers, France (BZR)",
            "city": "Beziers",
            "country": "France",
            "iata": "BZR",
            "airport": ""
          },
          {
            "label": "Bhadrapur, Nepal (BDP)",
            "city": "Bhadrapur",
            "country": "Nepal",
            "iata": "BDP",
            "airport": "Bhadrapur Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Bhairawa, Nepal (BWA)",
            "city": "Bhairawa",
            "country": "Nepal",
            "iata": "BWA",
            "airport": "Bhairahawa Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Bharatpur, Nepal (BHR)",
            "city": "Bharatpur",
            "country": "Nepal",
            "iata": "BHR",
            "airport": "Bharatpur Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Biak, Indonesia (BIK)",
            "city": "Biak",
            "country": "Indonesia",
            "iata": "BIK",
            "airport": "Frans Kaisiepo Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Biarritz, France (BIQ)",
            "city": "Biarritz",
            "country": "France",
            "iata": "BIQ",
            "airport": "Biarritz-Anglet-Bayonne Airport"
          },
          {
            "label": "Big Trout, Canada (YTL)",
            "city": "Big Trout",
            "country": "Canada",
            "iata": "YTL",
            "airport": "Big Trout Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Bikini Atoll, Marshall Islands (BII)",
            "city": "Bikini Atoll",
            "country": "Marshall Islands",
            "iata": "BII",
            "airport": "Enyu Airfield"
          },
          {
            "label": "Bilbao, Spain (BIO)",
            "city": "Bilbao",
            "country": "Spain",
            "iata": "BIO",
            "airport": "Bilbao Airport"
          },
          {
            "label": "Billings, US (BIL)",
            "city": "Billings",
            "country": "US",
            "iata": "BIL",
            "airport": "Billings Logan International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Billund, Denmark (BLL)",
            "city": "Billund",
            "country": "Denmark",
            "iata": "BLL",
            "airport": "Billund Airport"
          },
          {
            "label": "Bima, Indonesia (BMU)",
            "city": "Bima",
            "country": "Indonesia",
            "iata": "BMU",
            "airport": "Muhammad Salahuddin Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Binghamton, US (BGM)",
            "city": "Binghamton",
            "country": "US",
            "iata": "BGM",
            "airport": "Greater Binghamton/Edwin A Link field",
            "currency_code": "USD"
          },
          {
            "label": "Bintulu, Malaysia (BTU)",
            "city": "Bintulu",
            "country": "Malaysia",
            "iata": "BTU",
            "airport": "Bintulu Airport"
          },
          {
            "label": "Biratnagar, Nepal (BIR)",
            "city": "Biratnagar",
            "country": "Nepal",
            "iata": "BIR",
            "airport": "Biratnagar Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Birdsville, Australia (BVI)",
            "city": "Birdsville",
            "country": "Australia",
            "iata": "BVI",
            "airport": "Birdsville Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Bisha, Saudi Arabia (BHH)",
            "city": "Bisha",
            "country": "Saudi Arabia",
            "iata": "BHH",
            "airport": "Bisha Airport"
          },
          {
            "label": "Bishkek, Kyrgyzstan (FRU)",
            "city": "Bishkek",
            "country": "Kyrgyzstan",
            "iata": "FRU",
            "airport": "Manas International Airport"
          },
          {
            "label": "Bismarck, US (BIS)",
            "city": "Bismarck",
            "country": "US",
            "iata": "BIS",
            "airport": "Bismarck Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Bissau, Guinea (OXB)",
            "city": "Bissau",
            "country": "Guinea",
            "iata": "OXB",
            "airport": "Osvaldo Vieira International Airport"
          },
          {
            "label": "Blackall, Australia (BKQ)",
            "city": "Blackall",
            "country": "Australia",
            "iata": "BKQ",
            "airport": "Blackall Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Blackpool, UK (BLK)",
            "city": "Blackpool",
            "country": "UK",
            "iata": "BLK",
            "airport": "Blackpool International Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Blackwater, Australia (BLT)",
            "city": "Blackwater",
            "country": "Australia",
            "iata": "BLT",
            "airport": "Blackwater Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Blagoveschensk, Russia (BQS)",
            "city": "Blagoveschensk",
            "country": "Russia",
            "iata": "BQS",
            "airport": "Ignatyevo Airport"
          },
          {
            "label": "Blanc Sablon, Canada (YBX)",
            "city": "Blanc Sablon",
            "country": "Canada",
            "iata": "YBX",
            "airport": "Lourdes de Blanc Sablon Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Blantyre, Malawi (BLZ)",
            "city": "Blantyre",
            "country": "Malawi",
            "iata": "BLZ",
            "airport": "Chileka International Airport"
          },
          {
            "label": "Blenheim, New Zealand (BHE)",
            "city": "Blenheim",
            "country": "New Zealand",
            "iata": "BHE",
            "airport": "Woodbourne Airport"
          },
          {
            "label": "Bloemfontein, South Africa (BFN)",
            "city": "Bloemfontein",
            "country": "South Africa",
            "iata": "BFN",
            "airport": "J B M Hertzog International Airport"
          },
          {
            "label": "Bloomington Normal, US (BMI)",
            "city": "Bloomington Normal",
            "country": "US",
            "iata": "BMI",
            "airport": "Central Illinois Regional Airport at Bloomington-Normal",
            "currency_code": "USD"
          },
          {
            "label": "Blountville, US (TRI)",
            "city": "Blountville",
            "country": "US",
            "iata": "TRI",
            "airport": "Tri Cities Regional Tn Va Airport",
            "currency_code": "USD"
          },
          {
            "label": "Boa Vista, Brazil (BVB)",
            "city": "Boa Vista",
            "country": "Brazil",
            "iata": "BVB",
            "airport": "Atlas Brasil Cantanhede Airport"
          },
          {
            "label": "Boa Vista, Cape Verde (BVC)",
            "city": "Boa Vista",
            "country": "Cape Verde",
            "iata": "BVC",
            "airport": "Rabil Airport"
          },
          {
            "label": "Bobo Dioulasso, Burkina Faso (BOY)",
            "city": "Bobo Dioulasso",
            "country": "Burkina Faso",
            "iata": "BOY",
            "airport": "Bobo Dioulasso Airport"
          },
          {
            "label": "Bodo, Norway (BOO)",
            "city": "Bodo",
            "country": "Norway",
            "iata": "BOO",
            "airport": ""
          },
          {
            "label": "Bogota, Colombia (BOG)",
            "city": "Bogota",
            "country": "Colombia",
            "iata": "BOG",
            "airport": "El Dorado International Airport",
            "currency_code": "COP"
          },
          {
            "label": "Boigu Island, Australia (GIC)",
            "city": "Boigu Island",
            "country": "Australia",
            "iata": "GIC",
            "airport": "Boigu Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Boise, US (BOI)",
            "city": "Boise",
            "country": "US",
            "iata": "BOI",
            "airport": "Boise Air Terminal/Gowen field",
            "currency_code": "USD"
          },
          {
            "label": "Bol, Croatia (BWK)",
            "city": "Bol",
            "country": "Croatia",
            "iata": "BWK",
            "airport": "Bol Airport"
          },
          {
            "label": "Bologna, Italy (BLQ)",
            "city": "Bologna",
            "country": "Italy",
            "iata": "BLQ",
            "airport": "Bologna / Borgo Panigale Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Bolzano, Italy (BZO)",
            "city": "Bolzano",
            "country": "Italy",
            "iata": "BZO",
            "airport": "Bolzano Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Bonaventure, Canada (YVB)",
            "city": "Bonaventure",
            "country": "Canada",
            "iata": "YVB",
            "airport": "Bonaventure Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Bora Bora, French Polynesia (BOB)",
            "city": "Bora Bora",
            "country": "French Polynesia",
            "iata": "BOB",
            "airport": "Bora Bora Airport"
          },
          {
            "label": "Bordeaux, France (BOD)",
            "city": "Bordeaux",
            "country": "France",
            "iata": "BOD",
            "airport": ""
          },
          {
            "label": "Borlange/Falun, Sweden (BLE)",
            "city": "Borlange/Falun",
            "country": "Sweden",
            "iata": "BLE",
            "airport": "Borlange Airport"
          },
          {
            "label": "Bornholm, Denmark (RNN)",
            "city": "Bornholm",
            "country": "Denmark",
            "iata": "RNN",
            "airport": "Bornholm Airport"
          },
          {
            "label": "Boulder City, US (BLD)",
            "city": "Boulder City",
            "country": "US",
            "iata": "BLD",
            "airport": "Boulder City Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Boulia, Australia (BQL)",
            "city": "Boulia",
            "country": "Australia",
            "iata": "BQL",
            "airport": "Boulia Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Bourgas, Bulgaria (BOJ)",
            "city": "Bourgas",
            "country": "Bulgaria",
            "iata": "BOJ",
            "airport": "Burgas Airport"
          },
          {
            "label": "Bournemouth, UK (BOH)",
            "city": "Bournemouth",
            "country": "UK",
            "iata": "BOH",
            "airport": "Bournemouth Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Bozeman, US (BZN)",
            "city": "Bozeman",
            "country": "US",
            "iata": "BZN",
            "airport": "Gallatin Field",
            "currency_code": "USD"
          },
          {
            "label": "Bradenton/Sarasota, US (SRQ)",
            "city": "Bradenton/Sarasota",
            "country": "US",
            "iata": "SRQ",
            "airport": "Sarasota Bradenton International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Bradford, US (BFD)",
            "city": "Bradford",
            "country": "US",
            "iata": "BFD",
            "airport": "Bradford Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Brandon, Canada (YBR)",
            "city": "Brandon",
            "country": "Canada",
            "iata": "YBR",
            "airport": "Brandon Municipal Airport",
            "currency_code": "CAD"
          },
          {
            "label": "BrasÃƒÂ­lia, Brazil (BSB)",
            "city": "BrasÃƒÂ­lia",
            "country": "Brazil",
            "iata": "BSB",
            "airport": "Presidente Juscelino Kubistschek International Airport"
          },
          {
            "label": "Bratislava, Slovakia (BTS)",
            "city": "Bratislava",
            "country": "Slovakia",
            "iata": "BTS",
            "airport": ""
          },
          {
            "label": "Bratsk, Russia (BTK)",
            "city": "Bratsk",
            "country": "Russia",
            "iata": "BTK",
            "airport": "Bratsk Airport"
          },
          {
            "label": "Brazzaville, Republic of the Congo (BZV)",
            "city": "Brazzaville",
            "country": "Republic of the Congo",
            "iata": "BZV",
            "airport": "Maya-Maya Airport"
          },
          {
            "label": "Bremen, Germany (BRE)",
            "city": "Bremen",
            "country": "Germany",
            "iata": "BRE",
            "airport": "Bremen Airport"
          },
          {
            "label": "Brest, France (BES)",
            "city": "Brest",
            "country": "France",
            "iata": "BES",
            "airport": "Brest Bretagne Airport"
          },
          {
            "label": "Bridgeport, US (BDR)",
            "city": "Bridgeport",
            "country": "US",
            "iata": "BDR",
            "airport": "Igor I Sikorsky Memorial Airport",
            "currency_code": "USD"
          },
          {
            "label": "Bridgetown, Barbados (BGI)",
            "city": "Bridgetown",
            "country": "Barbados",
            "iata": "BGI",
            "airport": "Sir Grantley Adams International Airport"
          },
          {
            "label": "Brindisi, Italy (BDS)",
            "city": "Brindisi",
            "country": "Italy",
            "iata": "BDS",
            "airport": "Brindisi / Casale Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Bristol, UK (BRS)",
            "city": "Bristol",
            "country": "UK",
            "iata": "BRS",
            "airport": "Bristol International Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Brive-La-Gaillarde, France (BVE)",
            "city": "Brive-La-Gaillarde",
            "country": "France",
            "iata": "BVE",
            "airport": "Brive-La Roche Airport"
          },
          {
            "label": "Brize Norton, UK (BZZ)",
            "city": "Brize Norton",
            "country": "UK",
            "iata": "BZZ",
            "airport": "RAF Brize Norton",
            "currency_code": "GBP"
          },
          {
            "label": "Brno, Czech Republic (BRQ)",
            "city": "Brno",
            "country": "Czech Republic",
            "iata": "BRQ",
            "airport": "Brno-Turany Airport"
          },
          {
            "label": "Brochet, Canada (YBT)",
            "city": "Brochet",
            "country": "Canada",
            "iata": "YBT",
            "airport": "Brochet Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Broken Hill, Australia (BHQ)",
            "city": "Broken Hill",
            "country": "Australia",
            "iata": "BHQ",
            "airport": "Broken Hill Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Bronnoysund, Norway (BNN)",
            "city": "Bronnoysund",
            "country": "Norway",
            "iata": "BNN",
            "airport": ""
          },
          {
            "label": "Broome, Australia (BME)",
            "city": "Broome",
            "country": "Australia",
            "iata": "BME",
            "airport": "Broome International Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Brownsville, US (BRO)",
            "city": "Brownsville",
            "country": "US",
            "iata": "BRO",
            "airport": "Brownsville South Padre Island International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Brunswick, US (BQK)",
            "city": "Brunswick",
            "country": "US",
            "iata": "BQK",
            "airport": "Brunswick Golden Isles Airport",
            "currency_code": "USD"
          },
          {
            "label": "Bucaramanga, Colombia (BGA)",
            "city": "Bucaramanga",
            "country": "Colombia",
            "iata": "BGA",
            "airport": "Palonegro Airport",
            "currency_code": "COP"
          },
          {
            "label": "Buckland, US (BKC)",
            "city": "Buckland",
            "country": "US",
            "iata": "BKC",
            "airport": "Buckland Airport",
            "currency_code": "USD"
          },
          {
            "label": "Buenaventura, Colombia (BUN)",
            "city": "Buenaventura",
            "country": "Colombia",
            "iata": "BUN",
            "airport": ""
          },
          {
            "label": "Buffalo Range, Zimbabwe (BFO)",
            "city": "Buffalo Range",
            "country": "Zimbabwe",
            "iata": "BFO",
            "airport": "Buffalo Range Airport"
          },
          {
            "label": "Bujumbura, Burundi (BJM)",
            "city": "Bujumbura",
            "country": "Burundi",
            "iata": "BJM",
            "airport": "Bujumbura International Airport"
          },
          {
            "label": "Buka, Papua New Guinea (BUA)",
            "city": "Buka",
            "country": "Papua New Guinea",
            "iata": "BUA",
            "airport": "Buka Airport"
          },
          {
            "label": "Bukavu, Democratic Republic of the Congo (BKY)",
            "city": "Bukavu",
            "country": "Democratic Republic of the Congo",
            "iata": "BKY",
            "airport": "Bukavu Kavumu Airport"
          },
          {
            "label": "Bukhara, Uzbekistan (BHK)",
            "city": "Bukhara",
            "country": "Uzbekistan",
            "iata": "BHK",
            "airport": "Bukhara Airport"
          },
          {
            "label": "Bukoba, Tanzania (BKZ)",
            "city": "Bukoba",
            "country": "Tanzania",
            "iata": "BKZ",
            "airport": "Bukoba Airport"
          },
          {
            "label": "Bulawayo, Zimbabwe (BUQ)",
            "city": "Bulawayo",
            "country": "Zimbabwe",
            "iata": "BUQ",
            "airport": "Joshua Mqabuko Nkomo International Airport"
          },
          {
            "label": "Bullhead City, US (IFP)",
            "city": "Bullhead City",
            "country": "US",
            "iata": "IFP",
            "airport": "Laughlin Bullhead International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Bundaberg, Australia (BDB)",
            "city": "Bundaberg",
            "country": "Australia",
            "iata": "BDB",
            "airport": "Bundaberg Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Bunia, Democratic Republic of the Congo (BUX)",
            "city": "Bunia",
            "country": "Democratic Republic of the Congo",
            "iata": "BUX",
            "airport": "Bunia Airport"
          },
          {
            "label": "Burbank, US (BUR)",
            "city": "Burbank",
            "country": "US",
            "iata": "BUR",
            "airport": "Bob Hope Airport",
            "currency_code": "USD"
          },
          {
            "label": "Bureta, Fiji (LEV)",
            "city": "Bureta",
            "country": "Fiji",
            "iata": "LEV",
            "airport": "Levuka Airfield"
          },
          {
            "label": "Buri Ram, Thailand (BFV)",
            "city": "Buri Ram",
            "country": "Thailand",
            "iata": "BFV",
            "airport": "Buri Ram Airport",
            "currency_code": "THB"
          },
          {
            "label": "Burketown, Australia (BUC)",
            "city": "Burketown",
            "country": "Australia",
            "iata": "BUC",
            "airport": "Burketown Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Burlington, US (BRL)",
            "city": "Burlington",
            "country": "US",
            "iata": "BRL",
            "airport": "Southeast Iowa Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Burlington, US (BTV)",
            "city": "Burlington",
            "country": "US",
            "iata": "BTV",
            "airport": "Burlington International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Burnie, Australia (BWT)",
            "city": "Burnie",
            "country": "Australia",
            "iata": "BWT",
            "airport": "Wynyard Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Bursa, Turkey (YEI)",
            "city": "Bursa",
            "country": "Turkey",
            "iata": "YEI",
            "airport": "Bursa Yenisehir Airport"
          },
          {
            "label": "Busuanga, Philippines (USU)",
            "city": "Busuanga",
            "country": "Philippines",
            "iata": "USU",
            "airport": "Francisco B. Reyes Airport"
          },
          {
            "label": "Butte, US (BTM)",
            "city": "Butte",
            "country": "US",
            "iata": "BTM",
            "airport": "Bert Mooney Airport",
            "currency_code": "USD"
          },
          {
            "label": "Butuan City, Philippines (BXU)",
            "city": "Butuan City",
            "country": "Philippines",
            "iata": "BXU",
            "airport": "Bancasi Airport"
          },
          {
            "label": "Bydgoszcz, Poland (BZG)",
            "city": "Bydgoszcz",
            "country": "Poland",
            "iata": "BZG",
            "airport": "Bydgoszcz Ignacy Jan Paderewski Airport"
          },
          {
            "label": "Caen, France (CFR)",
            "city": "Caen",
            "country": "France",
            "iata": "CFR",
            "airport": "Caen-Carpiquet Airport"
          },
          {
            "label": "Cagayan De Oro, Philippines (CGY)",
            "city": "Cagayan De Oro",
            "country": "Philippines",
            "iata": "CGY",
            "airport": "Cagayan De Oro Airport"
          },
          {
            "label": "Cagliari, Italy (CAG)",
            "city": "Cagliari",
            "country": "Italy",
            "iata": "CAG",
            "airport": "Cagliari / Elmas Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Cairns, Australia (CNS)",
            "city": "Cairns",
            "country": "Australia",
            "iata": "CNS",
            "airport": "Cairns International Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Cajamarca, Peru (CJA)",
            "city": "Cajamarca",
            "country": "Peru",
            "iata": "CJA",
            "airport": "Mayor General FAP Armando Revoredo Iglesias Airport"
          },
          {
            "label": "Calama, Chile (CJC)",
            "city": "Calama",
            "country": "Chile",
            "iata": "CJC",
            "airport": "El Loa Airport"
          },
          {
            "label": "Calbayog, Philippines (CYP)",
            "city": "Calbayog",
            "country": "Philippines",
            "iata": "CYP",
            "airport": "Calbayog Airport"
          },
          {
            "label": "Cali, Colombia (CLO)",
            "city": "Cali",
            "country": "Colombia",
            "iata": "CLO",
            "airport": "Alfonso Bonilla Aragon International Airport" ,
            "currency_code": "COP"
          },
          {
            "label": "Calvi, France (CLY)",
            "city": "Calvi",
            "country": "France",
            "iata": "CLY",
            "airport": "Calvi-Sainte-Catherine Airport"
          },
          {
            "label": "Cam Ranh, Vietnam (CXR)",
            "city": "Cam Ranh",
            "country": "Vietnam",
            "iata": "CXR",
            "airport": "Cam Ranh Airport"
          },
          {
            "label": "Cambridge Bay, Canada (YCB)",
            "city": "Cambridge Bay",
            "country": "Canada",
            "iata": "YCB",
            "airport": "Cambridge Bay Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Cambridge, UK (CBG)",
            "city": "Cambridge",
            "country": "UK",
            "iata": "CBG",
            "airport": "Cambridge Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Camiguin, Philippines (CGM)",
            "city": "Camiguin",
            "country": "Philippines",
            "iata": "CGM",
            "airport": "Camiguin Airport"
          },
          {
            "label": "Campbell River, Canada (YBL)",
            "city": "Campbell River",
            "country": "Canada",
            "iata": "YBL",
            "airport": "Campbell River Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Campbeltown, UK (CAL)",
            "city": "Campbeltown",
            "country": "UK",
            "iata": "CAL",
            "airport": "Campbeltown Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Campeche, Mexico (CPE)",
            "city": "Campeche",
            "country": "Mexico",
            "iata": "CPE",
            "airport": ""
          },
          {
            "label": "Campina Grande, Brazil (CPV)",
            "city": "Campina Grande",
            "country": "Brazil",
            "iata": "CPV",
            "airport": "Campina Grande Airport"
          },
          {
            "label": "Campinas, Brazil (CPQ)",
            "city": "Campinas",
            "country": "Brazil",
            "iata": "CPQ",
            "airport": "Amarais Airport"
          },
          {
            "label": "Campo Grande, Brazil (CGR)",
            "city": "Campo Grande",
            "country": "Brazil",
            "iata": "CGR",
            "airport": "Campo Grande Airport"
          },
          {
            "label": "Campos, Brazil (CAW)",
            "city": "Campos",
            "country": "Brazil",
            "iata": "CAW",
            "airport": "Bartolomeu Lisandro Airport"
          },
          {
            "label": "Canakkale, Turkey (CKZ)",
            "city": "Canakkale",
            "country": "Turkey",
            "iata": "CKZ",
            "airport": ""
          },
          {
            "label": "Canberra, Australia (CBR)",
            "city": "Canberra",
            "country": "Australia",
            "iata": "CBR",
            "airport": "Canberra International Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Cancun, Mexico (CUN)",
            "city": "Cancun",
            "country": "Mexico",
            "iata": "CUN",
            "airport": ""
          },
          {
            "label": "Cap Skirring, Senegal (CSK)",
            "city": "Cap Skirring",
            "country": "Senegal",
            "iata": "CSK",
            "airport": "Cap Skirring Airport"
          },
          {
            "label": "Cape Dorset, Canada (YTE)",
            "city": "Cape Dorset",
            "country": "Canada",
            "iata": "YTE",
            "airport": "Cape Dorset Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Cape Girardeau, US (CGI)",
            "city": "Cape Girardeau",
            "country": "US",
            "iata": "CGI",
            "airport": "Cape Girardeau Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Cape Lisburne, US (LUR)",
            "city": "Cape Lisburne",
            "country": "US",
            "iata": "LUR",
            "airport": "Cape Lisburne Lrrs Airport",
            "currency_code": "USD"
          },
          {
            "label": "Cape Newenham, US (EHM)",
            "city": "Cape Newenham",
            "country": "US",
            "iata": "EHM",
            "airport": "Cape Newenham Lrrs Airport",
            "currency_code": "USD"
          },
          {
            "label": "Cap-Haitien, Haiti (CAP)",
            "city": "Cap-Haitien",
            "country": "Haiti",
            "iata": "CAP",
            "airport": "Cap Haitien International Airport"
          },
          {
            "label": "Caracas, Venezuela (CCS)",
            "city": "Caracas",
            "country": "Venezuela",
            "iata": "CCS",
            "airport": ""
          },
          {
            "label": "Carajas, Brazil (CKS)",
            "city": "Carajas",
            "country": "Brazil",
            "iata": "CKS",
            "airport": "Carajas Airport"
          },
          {
            "label": "Cardiff, UK (CWL)",
            "city": "Cardiff",
            "country": "UK",
            "iata": "CWL",
            "airport": "Cardiff International Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Carlisle, UK (CAX)",
            "city": "Carlisle",
            "country": "UK",
            "iata": "CAX",
            "airport": "Carlisle Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Carlsbad, US (CNM)",
            "city": "Carlsbad",
            "country": "US",
            "iata": "CNM",
            "airport": "Cavern City Air Terminal",
            "currency_code": "USD"
          },
          {
            "label": "Carmel/Monterey, US (MRY)",
            "city": "Carmel/Monterey",
            "country": "US",
            "iata": "MRY",
            "airport": "Monterey Peninsula Airport",
            "currency_code": "USD"
          },
          {
            "label": "Carnarvon, Australia (CVQ)",
            "city": "Carnarvon",
            "country": "Australia",
            "iata": "CVQ",
            "airport": "Carnarvon Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Cartagena, Colombia (CTG)",
            "city": "Cartagena",
            "country": "Colombia",
            "iata": "CTG",
            "airport": "",
            "currency_code": "COP"
          },
          {
            "label": "Cartwright, Canada (YRF)",
            "city": "Cartwright",
            "country": "Canada",
            "iata": "YRF",
            "airport": "Cartwright Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Carupano, Venezuela (CUP)",
            "city": "Carupano",
            "country": "Venezuela",
            "iata": "CUP",
            "airport": ""
          },
          {
            "label": "Casablanca, Morocco (CMN)",
            "city": "Casablanca",
            "country": "Morocco",
            "iata": "CMN",
            "airport": "Mohammed V International Airport"
          },
          {
            "label": "Cascavel, Brazil (CAC)",
            "city": "Cascavel",
            "country": "Brazil",
            "iata": "CAC",
            "airport": "Cascavel Airport"
          },
          {
            "label": "Casper, US (CPR)",
            "city": "Casper",
            "country": "US",
            "iata": "CPR",
            "airport": "Casper-Natrona County International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Castlegar, Canada (YCG)",
            "city": "Castlegar",
            "country": "Canada",
            "iata": "YCG",
            "airport": "Castlegar/West Kootenay Regional Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Castres, France (DCM)",
            "city": "Castres",
            "country": "France",
            "iata": "DCM",
            "airport": "Castres-Mazamet Airport"
          },
          {
            "label": "Cat Lake, Canada (YAC)",
            "city": "Cat Lake",
            "country": "Canada",
            "iata": "YAC",
            "airport": "Cat Lake Airport",
           "currency_code": "CAD"  
          },
          {
            "label": "Catamarca, Argentina (CTC)",
            "city": "Catamarca",
            "country": "Argentina",
            "iata": "CTC",
            "airport": "Catamarca Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Catania, Italy (CTA)",
            "city": "Catania",
            "country": "Italy",
            "iata": "CTA",
            "airport": "Catania / Fontanarossa Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Catarman, Philippines (CRM)",
            "city": "Catarman",
            "country": "Philippines",
            "iata": "CRM",
            "airport": "Catarman National Airport"
          },
          {
            "label": "Caticlan, Philippines (MPH)",
            "city": "Caticlan",
            "country": "Philippines",
            "iata": "MPH",
            "airport": "Godofredo P. Ramos Airport"
          },
          {
            "label": "Caxias do Sul, Brazil (CXJ)",
            "city": "Caxias do Sul",
            "country": "Brazil",
            "iata": "CXJ",
            "airport": "Campo dos Bugres Airport"
          },
          {
            "label": "Cayenne, French Guiana (CAY)",
            "city": "Cayenne",
            "country": "French Guiana",
            "iata": "CAY",
            "airport": "Cayenne-Rochambeau Airport"
          },
          {
            "label": "Cebu, Philippines (CEB)",
            "city": "Cebu",
            "country": "Philippines",
            "iata": "CEB",
            "airport": "Mactan Cebu International Airport"
          },
          {
            "label": "Cedar City, US (CDC)",
            "city": "Cedar City",
            "country": "US",
            "iata": "CDC",
            "airport": "Cedar City Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Cedar Rapids, US (CID)",
            "city": "Cedar Rapids",
            "country": "US",
            "iata": "CID",
            "airport": "The Eastern Iowa Airport",
            "currency_code": "USD"
          },
          {
            "label": "Ceduna, Australia (CED)",
            "city": "Ceduna",
            "country": "Australia",
            "iata": "CED",
            "airport": "Ceduna Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Chambery, France (CMF)",
            "city": "Chambery",
            "country": "France",
            "iata": "CMF",
            "airport": ""
          },
          {
            "label": "Champaign, US (CMI)",
            "city": "Champaign",
            "country": "US",
            "iata": "CMI",
            "airport": "University of Illinois Willard Airport",
            "currency_code": "USD"
          },
          {
            "label": "Changchun, China (CGQ)",
            "city": "Changchun",
            "country": "China",
            "iata": "CGQ",
            "airport": "Longjia Airport"
          },
          {
            "label": "Changde, China (CGD)",
            "city": "Changde",
            "country": "China",
            "iata": "CGD",
            "airport": "Changde Airport"
          },
          {
            "label": "Changsha, China (CSX)",
            "city": "Changsha",
            "country": "China",
            "iata": "CSX",
            "airport": "Changsha Huanghua Airport"
          },
          {
            "label": "Changzhi, China (CIH)",
            "city": "Changzhi",
            "country": "China",
            "iata": "CIH",
            "airport": "Changzhi Airport"
          },
          {
            "label": "Changzhou, China (CZX)",
            "city": "Changzhou",
            "country": "China",
            "iata": "CZX",
            "airport": "Changzhou Airport"
          },
          {
            "label": "Chania, Greece (CHQ)",
            "city": "Chania",
            "country": "Greece",
            "iata": "CHQ",
            "airport": "Chania International Airport"
          },
          {
            "label": "Chapeco, Brazil (XAP)",
            "city": "Chapeco",
            "country": "Brazil",
            "iata": "XAP",
            "airport": "Serafin Enoss Bertaso Airport"
          },
          {
            "label": "Charleston, US (CHS)",
            "city": "Charleston",
            "country": "US",
            "iata": "CHS",
            "airport": "Charleston Air Force Base-International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Charleston, US (CRW)",
            "city": "Charleston",
            "country": "US",
            "iata": "CRW",
            "airport": "Yeager Airport",
            "currency_code": "USD"
          },
          {
            "label": "Charleville, Australia (CTL)",
            "city": "Charleville",
            "country": "Australia",
            "iata": "CTL",
            "airport": "Charleville Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Charlottesville, US (CHO)",
            "city": "Charlottesville",
            "country": "US",
            "iata": "CHO",
            "airport": "Charlottesville Albemarle Airport",
            "currency_code": "USD"
          },
          {
            "label": "Charlottetown, Canada (YYG)",
            "city": "Charlottetown",
            "country": "Canada",
            "iata": "YYG",
            "airport": "Charlottetown Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Chatham Island, New Zealand (CHT)",
            "city": "Chatham Island",
            "country": "New Zealand",
            "iata": "CHT",
            "airport": "Chatham Islands-Tuuta Airport"
          },
          {
            "label": "Chattanooga, US (CHA)",
            "city": "Chattanooga",
            "country": "US",
            "iata": "CHA",
            "airport": "Lovell Field",
            "currency_code": "USD"
          },
          {
            "label": "Cheboksary, Russia (CSY)",
            "city": "Cheboksary",
            "country": "Russia",
            "iata": "CSY",
            "airport": "Cheboksary Airport"
          },
          {
            "label": "Chelyabinsk, Russia (CEK)",
            "city": "Chelyabinsk",
            "country": "Russia",
            "iata": "CEK",
            "airport": "Chelyabinsk Balandino Airport"
          },
          {
            "label": "Chengdu, China (CTU)",
            "city": "Chengdu",
            "country": "China",
            "iata": "CTU",
            "airport": "Chengdu Shuangliu International Airport"
          },
          {
            "label": "Cheongju, South Korea (CJJ)",
            "city": "Cheongju",
            "country": "South Korea",
            "iata": "CJJ",
            "airport": "Cheongju International Airport"
          },
          {
            "label": "Cherbourg, France (CER)",
            "city": "Cherbourg",
            "country": "France",
            "iata": "CER",
            "airport": "Cherbourg-Maupertus Airport"
          },
          {
            "label": "Cherepovets, Russia (CEE)",
            "city": "Cherepovets",
            "country": "Russia",
            "iata": "CEE",
            "airport": "Cherepovets Airport"
          },
          {
            "label": "Chernovtsy, Ukraine (CWC)",
            "city": "Chernovtsy",
            "country": "Ukraine",
            "iata": "CWC",
            "airport": "Chernivtsi International Airport"
          },
          {
            "label": "Cherskiy, Russia (CYX)",
            "city": "Cherskiy",
            "country": "Russia",
            "iata": "CYX",
            "airport": "Cherskiy Airport"
          },
          {
            "label": "Chester, UK (CEG)",
            "city": "Chester",
            "country": "UK",
            "iata": "CEG",
            "airport": "Hawarden Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Chesterfield Inlet, Canada (YCS)",
            "city": "Chesterfield Inlet",
            "country": "Canada",
            "iata": "YCS",
            "airport": "Chesterfield Inlet Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Chetumal, Mexico (CTM)",
            "city": "Chetumal",
            "country": "Mexico",
            "iata": "CTM",
            "airport": "Chetumal International Airport"
          },
          {
            "label": "Chevak, US (VAK)",
            "city": "Chevak",
            "country": "US",
            "iata": "VAK",
            "airport": "Chevak Airport",
            "currency_code": "USD"
          },
          {
            "label": "Chevery, Canada (YHR)",
            "city": "Chevery",
            "country": "Canada",
            "iata": "YHR",
            "airport": "Chevery Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Cheyenne, US (CYS)",
            "city": "Cheyenne",
            "country": "US",
            "iata": "CYS",
            "airport": "Cheyenne Regional Jerry Olson Field",
            "currency_code": "USD"
          },
          {
            "label": "Chiang Mai, Thailand (CNX)",
            "city": "Chiang Mai",
            "country": "Thailand",
            "iata": "CNX",
            "airport": "Chiang Mai International Airport",
            "currency_code": "THB"
          },
          {
            "label": "Chiang Rai, Thailand (CEI)",
            "city": "Chiang Rai",
            "country": "Thailand",
            "iata": "CEI",
            "airport": "Chiang Rai International Airport",
            "currency_code": "THB"
          },
          {
            "label": "Chiayi, Taiwan (CYI)",
            "city": "Chiayi",
            "country": "Taiwan",
            "iata": "CYI",
            "airport": "Chiayi Airport"
          },
          {
            "label": "Chibougamau, Canada (YMT)",
            "city": "Chibougamau",
            "country": "Canada",
            "iata": "YMT",
            "airport": "Chapais Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Chiclayo, Peru (CIX)",
            "city": "Chiclayo",
            "country": "Peru",
            "iata": "CIX",
            "airport": "Capitan FAP Jose A Quinones Gonzales International Airport"
          },
          {
            "label": "Chifeng, China (CIF)",
            "city": "Chifeng",
            "country": "China",
            "iata": "CIF",
            "airport": "Chifeng Airport"
          },
          {
            "label": "Chignik, US (KCL)",
            "city": "Chignik",
            "country": "US",
            "iata": "KCL",
            "airport": "Chignik Lagoon Airport",
            "currency_code": "USD"
          },
          {
            "label": "Chihuahua, Mexico (CUU)",
            "city": "Chihuahua",
            "country": "Mexico",
            "iata": "CUU",
            "airport": "General Roberto Fierro Villalobos International Airport"
          },
          {
            "label": "Chimoio, Mozambique (VPY)",
            "city": "Chimoio",
            "country": "Mozambique",
            "iata": "VPY",
            "airport": "Chimoio Airport"
          },
          {
            "label": "Chios, Greece (JKH)",
            "city": "Chios",
            "country": "Greece",
            "iata": "JKH",
            "airport": "Chios Island National Airport"
          },
          {
            "label": "Chipata, Zambia (CIP)",
            "city": "Chipata",
            "country": "Zambia",
            "iata": "CIP",
            "airport": "Chipata Airport"
          },
          {
            "label": "Chisasibi, Canada (YKU)",
            "city": "Chisasibi",
            "country": "Canada",
            "iata": "YKU",
            "airport": "Chisasibi Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Chisholm/Hibbing, US (HIB)",
            "city": "Chisholm/Hibbing",
            "country": "US",
            "iata": "HIB",
            "airport": "Chisholm Hibbing Airport",
            "currency_code": "USD"
          },
          {
            "label": "Chisinau, Moldova (KIV)",
            "city": "Chisinau",
            "country": "Moldova",
            "iata": "KIV",
            "airport": "Chisinau International Airport"
          },
          {
            "label": "Chita, Russia (HTA)",
            "city": "Chita",
            "country": "Russia",
            "iata": "HTA",
            "airport": "Chita-Kadala Airport"
          },
          {
            "label": "Chittagong, Bangladesh (CGP)",
            "city": "Chittagong",
            "country": "Bangladesh",
            "iata": "CGP",
            "airport": "Shah Amanat International Airport",
            "currency_code": "BDT"
          },
          {
            "label": "Chokurdah, Russia (CKH)",
            "city": "Chokurdah",
            "country": "Russia",
            "iata": "CKH",
            "airport": "Chokurdakh Airport"
          },
          {
            "label": "Chongqing, China (CKG)",
            "city": "Chongqing",
            "country": "China",
            "iata": "CKG",
            "airport": "Chongqing Jiangbei International Airport"
          },
          {
            "label": "Christmas Island, Christmas Island (XCH)",
            "city": "Christmas Island",
            "country": "Christmas Island",
            "iata": "XCH",
            "airport": "Christmas Island Airport"
          },
          {
            "label": "Christmas Island, Kiribati (CXI)",
            "city": "Christmas Island",
            "country": "Kiribati",
            "iata": "CXI",
            "airport": "Cassidy International Airport"
          },
          {
            "label": "Churchill Falls, Canada (ZUM)",
            "city": "Churchill Falls",
            "country": "Canada",
            "iata": "ZUM",
            "airport": "Churchill Falls Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Churchill, Canada (YYQ)",
            "city": "Churchill",
            "country": "Canada",
            "iata": "YYQ",
            "airport": "Churchill Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Cicia, Fiji (ICI)",
            "city": "Cicia",
            "country": "Fiji",
            "iata": "ICI",
            "airport": "Cicia Airport"
          },
          {
            "label": "Ciudad Bolivar, Venezuela (CBL)",
            "city": "Ciudad Bolivar",
            "country": "Venezuela",
            "iata": "CBL",
            "airport": ""
          },
          {
            "label": "Ciudad Del Carmen, Mexico (CME)",
            "city": "Ciudad Del Carmen",
            "country": "Mexico",
            "iata": "CME",
            "airport": "Ciudad del Carmen International Airport"
          },
          {
            "label": "Ciudad Del Este, Paraguay (AGT)",
            "city": "Ciudad Del Este",
            "country": "Paraguay",
            "iata": "AGT",
            "airport": "Guarani International Airport"
          },
          {
            "label": "Ciudad Juarez, Mexico (CJS)",
            "city": "Ciudad Juarez",
            "country": "Mexico",
            "iata": "CJS",
            "airport": ""
          },
          {
            "label": "Ciudad Obregon, Mexico (CEN)",
            "city": "Ciudad Obregon",
            "country": "Mexico",
            "iata": "CEN",
            "airport": ""
          },
          {
            "label": "Ciudad Victoria, Mexico (CVM)",
            "city": "Ciudad Victoria",
            "country": "Mexico",
            "iata": "CVM",
            "airport": "General Pedro Jose Mendez International Airport"
          },
          {
            "label": "Clarksburg, US (CKB)",
            "city": "Clarksburg",
            "country": "US",
            "iata": "CKB",
            "airport": "North Central West Virginia Airport",
            "currency_code": "USD"
          },
          {
            "label": "Clermont-Ferrand, France (CFE)",
            "city": "Clermont-Ferrand",
            "country": "France",
            "iata": "CFE",
            "airport": "Clermont-Ferrand Auvergne Airport"
          },
          {
            "label": "Cloncurry, Australia (CNJ)",
            "city": "Cloncurry",
            "country": "Australia",
            "iata": "CNJ",
            "airport": "Cloncurry Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Club Makokola, Malawi (CMK)",
            "city": "Club Makokola",
            "country": "Malawi",
            "iata": "CMK",
            "airport": "Club Makokola Airport"
          },
          {
            "label": "Cluj Napoca, Romania (CLJ)",
            "city": "Cluj Napoca",
            "country": "Romania",
            "iata": "CLJ",
            "airport": "Cluj-Napoca International Airport",
            "currency_code": "RON"
          },
          {
            "label": "Clyde River, Canada (YCY)",
            "city": "Clyde River",
            "country": "Canada",
            "iata": "YCY",
            "airport": "Clyde River Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Cobija, Bolivia (CIJ)",
            "city": "Cobija",
            "country": "Bolivia",
            "iata": "CIJ",
            "airport": ""
          },
          {
            "label": "Coca, Ecuador (OCC)",
            "city": "Coca",
            "country": "Ecuador",
            "iata": "OCC",
            "airport": "Francisco De Orellana Airport"
          },
          {
            "label": "Cochabamba, Bolivia (CBB)",
            "city": "Cochabamba",
            "country": "Bolivia",
            "iata": "CBB",
            "airport": "Jorge Wilsterman International Airport"
          },
          {
            "label": "Coconut Island, Australia (CNC)",
            "city": "Coconut Island",
            "country": "Australia",
            "iata": "CNC",
            "airport": "Coconut Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Cocos Islands, Cocos Keeling Islands (CCK)",
            "city": "Cocos Islands",
            "country": "Cocos Keeling Islands",
            "iata": "CCK",
            "airport": "Cocos (Keeling) Islands Airport"
          },
          {
            "label": "Coen, Australia (CUQ)",
            "city": "Coen",
            "country": "Australia",
            "iata": "CUQ",
            "airport": "Coen Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Coffs Harbour, Australia (CFS)",
            "city": "Coffs Harbour",
            "country": "Australia",
            "iata": "CFS",
            "airport": "Coffs Harbour Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Cold Bay, US (CDB)",
            "city": "Cold Bay",
            "country": "US",
            "iata": "CDB",
            "airport": "Cold Bay Airport",
            "currency_code": "USD"
          },
          {
            "label": "Colima, Mexico (CLQ)",
            "city": "Colima",
            "country": "Mexico",
            "iata": "CLQ",
            "airport": "Lic. Miguel de la Madrid Airport"
          },
          {
            "label": "College Station, US (CLL)",
            "city": "College Station",
            "country": "US",
            "iata": "CLL",
            "airport": "Easterwood Field",
            "currency_code": "USD"
          },
          {
            "label": "Cologne, Germany (CGN)",
            "city": "Cologne",
            "country": "Germany",
            "iata": "CGN",
            "airport": "Cologne Bonn Airport"
          },
          {
            "label": "Colorado Springs, US (COS)",
            "city": "Colorado Springs",
            "country": "US",
            "iata": "COS",
            "airport": "City of Colorado Springs Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Columbia, US (CAE)",
            "city": "Columbia",
            "country": "US",
            "iata": "CAE",
            "airport": "Columbia Metropolitan Airport",
            "currency_code": "USD"
          },
          {
            "label": "Columbia, US (COU)",
            "city": "Columbia",
            "country": "US",
            "iata": "COU",
            "airport": "Columbia Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Columbus, US (CMH)",
            "city": "Columbus",
            "country": "US",
            "iata": "CMH",
            "airport": "Port Columbus International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Columbus, US (CSG)",
            "city": "Columbus",
            "country": "US",
            "iata": "CSG",
            "airport": "Columbus Metropolitan Airport",
            "currency_code": "USD"
          },
          {
            "label": "Colville Lake, Canada (YCK)",
            "city": "Colville Lake",
            "country": "Canada",
            "iata": "YCK",
            "airport": "Colville Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Comodoro Rivadavia, Argentina (CRD)",
            "city": "Comodoro Rivadavia",
            "country": "Argentina",
            "iata": "CRD",
            "airport": "General E. Mosconi Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Comox, Canada (YQQ)",
            "city": "Comox",
            "country": "Canada",
            "iata": "YQQ",
            "airport": "Comox Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Con Dao, Vietnam (VCS)",
            "city": "Con Dao",
            "country": "Vietnam",
            "iata": "VCS",
            "airport": "Co Ong Airport"
          },
          {
            "label": "Concepcion, Chile (CCP)",
            "city": "Concepcion",
            "country": "Chile",
            "iata": "CCP",
            "airport": "Carriel Sur Airport"
          },
          {
            "label": "Constanta, Romania (CND)",
            "city": "Constanta",
            "country": "Romania",
            "iata": "CND",
            "airport": "Mihail Kogalniceanu International Airport",
            "currency_code": "RON"
          },
          {
            "label": "Coober Pedy, Australia (CPD)",
            "city": "Coober Pedy",
            "country": "Australia",
            "iata": "CPD",
            "airport": "Coober Pedy Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Cooktown, Australia (CTN)",
            "city": "Cooktown",
            "country": "Australia",
            "iata": "CTN",
            "airport": "Cooktown Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Copiapo, Chile (CPO)",
            "city": "Copiapo",
            "country": "Chile",
            "iata": "CPO",
            "airport": "Chamonate Airport"
          },
          {
            "label": "Coral Harbour, Canada (YZS)",
            "city": "Coral Harbour",
            "country": "Canada",
            "iata": "YZS",
            "airport": "Coral Harbour Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Cordoba, Argentina (COR)",
            "city": "Cordoba",
            "country": "Argentina",
            "iata": "COR",
            "airport": "Ingeniero Ambrosio Taravella Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Cordova, US (CDV)",
            "city": "Cordova",
            "country": "US",
            "iata": "CDV",
            "airport": "Merle K (Mudhole) Smith Airport",
            "currency_code": "USD"
          },
          {
            "label": "Corfu, Greece (CFU)",
            "city": "Corfu",
            "country": "Greece",
            "iata": "CFU",
            "airport": "Ioannis Kapodistrias International Airport"
          },
          {
            "label": "Cork, Ireland (ORK)",
            "city": "Cork",
            "country": "Ireland",
            "iata": "ORK",
            "airport": "Cork Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Corning/Elmira, US (ELM)",
            "city": "Corning/Elmira",
            "country": "US",
            "iata": "ELM",
            "airport": "Elmira Corning Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Cornwall, Canada (YCC)",
            "city": "Cornwall",
            "country": "Canada",
            "iata": "YCC",
            "airport": "Cornwall Regional Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Coro, Venezuela (CZE)",
            "city": "Coro",
            "country": "Venezuela",
            "iata": "CZE",
            "airport": ""
          },
          {
            "label": "Corozal, Colombia (CZU)",
            "city": "Corozal",
            "country": "Colombia",
            "iata": "CZU",
            "airport": "Las Brujas Airport",
            "currency_code": "COP"
          },
          {
            "label": "Corpus Christi, US (CRP)",
            "city": "Corpus Christi",
            "country": "US",
            "iata": "CRP",
            "airport": "Corpus Christi International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Corrientes, Argentina (CNQ)",
            "city": "Corrientes",
            "country": "Argentina",
            "iata": "CNQ",
            "airport": "Corrientes Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Corumba, Brazil (CMG)",
            "city": "Corumba",
            "country": "Brazil",
            "iata": "CMG",
            "airport": "Corumbá International Airport"
          },
          {
            "label": "Corvo Island, Portugal (CVU)",
            "city": "Corvo Island",
            "country": "Portugal",
            "iata": "CVU",
            "airport": "Corvo Airport"
          },
          {
            "label": "Cotabato, Philippines (CBO)",
            "city": "Cotabato",
            "country": "Philippines",
            "iata": "CBO",
            "airport": "Awang Airport"
          },
          {
            "label": "Cotonou, Benin (COO)",
            "city": "Cotonou",
            "country": "Benin",
            "iata": "COO",
            "airport": "Cadjehoun Airport"
          },
          {
            "label": "Coventry, UK (CVT)",
            "city": "Coventry",
            "country": "UK",
            "iata": "CVT",
            "airport": "Coventry Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Cox's Bazar, Bangladesh (CXB)",
            "city": "Cox's Bazar",
            "country": "Bangladesh",
            "iata": "CXB",
            "airport": "Cox's Bazar Airport",
            "currency_code": "BDT"
          },
          {
            "label": "Cozumel, Mexico (CZM)",
            "city": "Cozumel",
            "country": "Mexico",
            "iata": "CZM",
            "airport": "Cozumel International Airport"
          },
          {
            "label": "Craig Cove, Vanuatu (CCV)",
            "city": "Craig Cove",
            "country": "Vanuatu",
            "iata": "CCV",
            "airport": "Craig Cove Airport"
          },
          {
            "label": "Craig, US (CGA)",
            "city": "Craig",
            "country": "US",
            "iata": "CGA",
            "airport": "Craig Seaplane Base",
            "currency_code": "USD"
          },
          {
            "label": "Craiova, Romania (CRA)",
            "city": "Craiova",
            "country": "Romania",
            "iata": "CRA",
            "airport": "Craiova Airport",
            "currency_code": "RON"
          },
          {
            "label": "Cranbrook, Canada (YXC)",
            "city": "Cranbrook",
            "country": "Canada",
            "iata": "YXC",
            "airport": "Cranbrook Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Crescent City, US (CEC)",
            "city": "Crescent City",
            "country": "US",
            "iata": "CEC",
            "airport": "Jack Mc Namara Field Airport",
            "currency_code": "USD"
          },
          {
            "label": "Cross Lake, Canada (YCR)",
            "city": "Cross Lake",
            "country": "Canada",
            "iata": "YCR",
            "airport": "Cross Lake (Charlie Sinclair Memorial) Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Crotone, Italy (CRV)",
            "city": "Crotone",
            "country": "Italy",
            "iata": "CRV",
            "airport": "Crotone Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Cruzeiro Do Sul, Brazil (CZS)",
            "city": "Cruzeiro Do Sul",
            "country": "Brazil",
            "iata": "CZS",
            "airport": "Cruzeiro do Sul Airport"
          },
          {
            "label": "Cucuta, Colombia (CUC)",
            "city": "Cucuta",
            "country": "Colombia",
            "iata": "CUC",
            "airport": "Camilo Daza International Airport",
            "currency_code": "COP"
          },
          {
            "label": "Cuenca, Ecuador (CUE)",
            "city": "Cuenca",
            "country": "Ecuador",
            "iata": "CUE",
            "airport": "Mariscal Lamar Airport"
          },
          {
            "label": "Cuiaba, Brazil (CGB)",
            "city": "Cuiaba",
            "country": "Brazil",
            "iata": "CGB",
            "airport": "Marechal Rondon Airport"
          },
          {
            "label": "Culiacan, Mexico (CUL)",
            "city": "Culiacan",
            "country": "Mexico",
            "iata": "CUL",
            "airport": "Federal de Bachigualato International Airport"
          },
          {
            "label": "Cumana, Venezuela (CUM)",
            "city": "Cumana",
            "country": "Venezuela",
            "iata": "CUM",
            "airport": ""
          },
          {
            "label": "Cuneo, Italy (CUF)",
            "city": "Cuneo",
            "country": "Italy",
            "iata": "CUF",
            "airport": "Cuneo / Levaldigi Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Cunnamulla, Australia (CMA)",
            "city": "Cunnamulla",
            "country": "Australia",
            "iata": "CMA",
            "airport": "Cunnamulla Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Curacao (CUR)",
            "city": "Curacao",
            "country": "Netherlands Antilles",
            "iata": "CUR",
            "airport": "Hato International Airport"
          },
          {
            "label": "Curitiba, Brazil (CWB)",
            "city": "Curitiba",
            "country": "Brazil",
            "iata": "CWB",
            "airport": "Afonso Pena Airport"
          },
          {
            "label": "Cuzco, Peru (CUZ)",
            "city": "Cuzco",
            "country": "Peru",
            "iata": "CUZ",
            "airport": "Alejandro Velasco Astete International Airport"
          },
          {
            "label": "Da Nang, Vietnam (DAD)",
            "city": "Da Nang",
            "country": "Vietnam",
            "iata": "DAD",
            "airport": "Da Nang International Airport"
          },
          {
            "label": "Daegu, South Korea (TAE)",
            "city": "Daegu",
            "country": "South Korea",
            "iata": "TAE",
            "airport": "Daegu Airport"
          },
          {
            "label": "Dakar, Senegal (DKR)",
            "city": "Dakar",
            "country": "Senegal",
            "iata": "DKR",
            "airport": ""
          },
          {
            "label": "Dakhla, Morocco (VIL)",
            "city": "Dakhla",
            "country": "Morocco",
            "iata": "VIL",
            "airport": "Dakhla Airport"
          },
          {
            "label": "Dalaman, Turkey (DLM)",
            "city": "Dalaman",
            "country": "Turkey",
            "iata": "DLM",
            "airport": "Dalaman International Airport"
          },
          {
            "label": "Dalat, Vietnam (DLI)",
            "city": "Dalat",
            "country": "Vietnam",
            "iata": "DLI",
            "airport": "Lien Khuong Airport"
          },
          {
            "label": "Dali City, China (DLU)",
            "city": "Dali City",
            "country": "China",
            "iata": "DLU",
            "airport": "Dali Airport"
          },
          {
            "label": "Dalian, China (DLC)",
            "city": "Dalian",
            "country": "China",
            "iata": "DLC",
            "airport": "Zhoushuizi Airport"
          },
          {
            "label": "Dallas - Fort Worth, US (DFW)",
            "city": "Dallas / Fort Worth",
            "country": "US",
            "iata": "DFW",
            "airport": "Dallas Fort Worth International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Dallas, US (DAL)",
            "city": "Dallas",
            "country": "US",
            "iata": "DAL",
            "airport": "Dallas Love Field",
            "currency_code": "USD"
          },
          {
            "label": "Dandong, China (DDG)",
            "city": "Dandong",
            "country": "China",
            "iata": "DDG",
            "airport": "Dandong Airport"
          },
          {
            "label": "Darnley Island, Australia (NLF)",
            "city": "Darnley Island",
            "country": "Australia",
            "iata": "NLF",
            "airport": "Darnley Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Daru, Papua New Guinea (DAU)",
            "city": "Daru",
            "country": "Papua New Guinea",
            "iata": "DAU",
            "airport": "Daru Airport"
          },
          {
            "label": "Darwin, Australia (DRW)",
            "city": "Darwin",
            "country": "Australia",
            "iata": "DRW",
            "airport": "Darwin International Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Datadawai, Indonesia (DTD)",
            "city": "Datadawai",
            "country": "Indonesia",
            "iata": "DTD",
            "airport": "Datadawai Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Datong, China (DAT)",
            "city": "Datong",
            "country": "China",
            "iata": "DAT",
            "airport": "Desierto de Atacama Airport"
          },
          {
            "label": "Dauphin, Canada (YDN)",
            "city": "Dauphin",
            "country": "Canada",
            "iata": "YDN",
            "airport": "Dauphin Barker Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Davao, Philippines (DVO)",
            "city": "Davao",
            "country": "Philippines",
            "iata": "DVO",
            "airport": "Francisco Bangoy International Airport"
          },
          {
            "label": "Dawadmi, Saudi Arabia (DWD)",
            "city": "Dawadmi",
            "country": "Saudi Arabia",
            "iata": "DWD",
            "airport": "Dawadmi Domestic Airport"
          },
          {
            "label": "Dawson City, Canada (YDA)",
            "city": "Dawson City",
            "country": "Canada",
            "iata": "YDA",
            "airport": "Dawson City Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Dawson Creek, Canada (YDQ)",
            "city": "Dawson Creek",
            "country": "Canada",
            "iata": "YDQ",
            "airport": "Dawson Creek Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Daxian, China (DAX)",
            "city": "Daxian",
            "country": "China",
            "iata": "DAX",
            "airport": "Dachuan Airport"
          },
          {
            "label": "Dayong, China (DYG)",
            "city": "Dayong",
            "country": "China",
            "iata": "DYG",
            "airport": "Dayong Airport"
          },
          {
            "label": "Dayton, US (DAY)",
            "city": "Dayton",
            "country": "US",
            "iata": "DAY",
            "airport": "James M Cox Dayton International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Daytona Beach, US (DAB)",
            "city": "Daytona Beach",
            "country": "US",
            "iata": "DAB",
            "airport": "Daytona Beach International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Decatur, US (DEC)",
            "city": "Decatur",
            "country": "US",
            "iata": "DEC",
            "airport": "Decatur Airport",
            "currency_code": "USD"
          },
          {
            "label": "Deer Lake, Canada (YDF)",
            "city": "Deer Lake",
            "country": "Canada",
            "iata": "YDF",
            "airport": "Deer Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Deer Lake, Canada (YVZ)",
            "city": "Deer Lake",
            "country": "Canada",
            "iata": "YVZ",
            "airport": "Deer Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Deering, US (DRG)",
            "city": "Deering",
            "country": "US",
            "iata": "DRG",
            "airport": "Deering Airport",
            "currency_code": "USD"
          },
          {
            "label": "Deline, Canada (YWJ)",
            "city": "Deline",
            "country": "Canada",
            "iata": "YWJ",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Denizli, Turkey (DNZ)",
            "city": "Denizli",
            "country": "Turkey",
            "iata": "DNZ",
            "airport": ""
          },
          {
            "label": "Des Moines, US (DSM)",
            "city": "Des Moines",
            "country": "US",
            "iata": "DSM",
            "airport": "Des Moines International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Devonport, Australia (DPO)",
            "city": "Devonport",
            "country": "Australia",
            "iata": "DPO",
            "airport": "Devonport Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Dien Bien Phu, Vietnam (DIN)",
            "city": "Dien Bien Phu",
            "country": "Vietnam",
            "iata": "DIN",
            "airport": "Dien Bien Phu Airport"
          },
          {
            "label": "Dijon, France (DIJ)",
            "city": "Dijon",
            "country": "France",
            "iata": "DIJ",
            "airport": "Dijon-Bourgogne Airport"
          },
          {
            "label": "Dikson, Russia (DKS)",
            "city": "Dikson",
            "country": "Russia",
            "iata": "DKS",
            "airport": "Dikson Airport"
          },
          {
            "label": "Dili, East Timor (DIL)",
            "city": "Dili",
            "country": "East Timor",
            "iata": "DIL",
            "airport": "Presidente Nicolau Lobato International Airport"
          },
          {
            "label": "Dillingham, US (DLG)",
            "city": "Dillingham",
            "country": "US",
            "iata": "DLG",
            "airport": "Dillingham Airport",
            "currency_code": "USD"
          },
          {
            "label": "Dillons Bay, Vanuatu (DLY)",
            "city": "Dillons Bay",
            "country": "Vanuatu",
            "iata": "DLY",
            "airport": "Dillon's Bay Airport"
          },
          {
            "label": "Dinard, France (DNR)",
            "city": "Dinard",
            "country": "France",
            "iata": "DNR",
            "airport": "Dinard-Pleurtuit-Saint-Malo Airport"
          },
          {
            "label": "Dipolog, Philippines (DPL)",
            "city": "Dipolog",
            "country": "Philippines",
            "iata": "DPL",
            "airport": "Dipolog Airport"
          },
          {
            "label": "Diqing, China (DIG)",
            "city": "Diqing",
            "country": "China",
            "iata": "DIG",
            "airport": "Diqing Airport"
          },
          {
            "label": "Dire Dawa, Ethiopia (DIR)",
            "city": "Dire Dawa",
            "country": "Ethiopia",
            "iata": "DIR",
            "airport": "Aba Tenna Dejazmach Yilma International Airport"
          },
          {
            "label": "Diyarbakir, Turkey (DIY)",
            "city": "Diyarbakir",
            "country": "Turkey",
            "iata": "DIY",
            "airport": "Diyarbakir Airport"
          },
          {
            "label": "Djerba, Tunisia (DJE)",
            "city": "Djerba",
            "country": "Tunisia",
            "iata": "DJE",
            "airport": "Djerba Zarzis International Airport"
          },
          {
            "label": "Djibouti, Djibouti (JIB)",
            "city": "Djibouti",
            "country": "Djibouti",
            "iata": "JIB",
            "airport": "Djibouti-Ambouli Airport"
          },
          {
            "label": "Dnepropetrovsk, Ukraine (DNK)",
            "city": "Dnepropetrovsk",
            "country": "Ukraine",
            "iata": "DNK",
            "airport": "Dnipropetrovsk International Airport"
          },
          {
            "label": "Dodge City, US (DDC)",
            "city": "Dodge City",
            "country": "US",
            "iata": "DDC",
            "airport": "Dodge City Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Dolpa, Nepal (DOP)",
            "city": "Dolpa",
            "country": "Nepal",
            "iata": "DOP",
            "airport": "Dolpa Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Doncaster, UK (DSA)",
            "city": "Doncaster",
            "country": "UK",
            "iata": "DSA",
            "airport": "Robin Hood Doncaster Sheffield Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Donegal, Ireland (CFN)",
            "city": "Donegal",
            "country": "Ireland",
            "iata": "CFN",
            "airport": "Donegal Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Donetsk, Ukraine (DOK)",
            "city": "Donetsk",
            "country": "Ukraine",
            "iata": "DOK",
            "airport": "Donetsk International Airport"
          },
          {
            "label": "Dongsheng, China (DSN)",
            "city": "Dongsheng",
            "country": "China",
            "iata": "DSN",
            "airport": "Ordos Ejin Horo Airport"
          },
          {
            "label": "Doomadgee, Australia (DMD)",
            "city": "Doomadgee",
            "country": "Australia",
            "iata": "DMD",
            "airport": "Doomadgee Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Dortmund, Germany (DTM)",
            "city": "Dortmund",
            "country": "Germany",
            "iata": "DTM",
            "airport": "Dortmund Airport"
          },
          {
            "label": "Dothan, US (DHN)",
            "city": "Dothan",
            "country": "US",
            "iata": "DHN",
            "airport": "Dothan Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Dourados, Brazil (DOU)",
            "city": "Dourados",
            "country": "Brazil",
            "iata": "DOU",
            "airport": "Dourados Airport"
          },
          {
            "label": "Dresden, Germany (DRS)",
            "city": "Dresden",
            "country": "Germany",
            "iata": "DRS",
            "airport": "Dresden Airport"
          },
          {
            "label": "Dryden, Canada (YHD)",
            "city": "Dryden",
            "country": "Canada",
            "iata": "YHD",
            "airport": "Dryden Regional Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Dubbo, Australia (DBO)",
            "city": "Dubbo",
            "country": "Australia",
            "iata": "DBO",
            "airport": "Dubbo City Regional Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Dubois, US (DUJ)",
            "city": "Dubois",
            "country": "US",
            "iata": "DUJ",
            "airport": "DuBois Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Dubrovnik, Croatia (DBV)",
            "city": "Dubrovnik",
            "country": "Croatia",
            "iata": "DBV",
            "airport": "Dubrovnik Airport"
          },
          {
            "label": "Dubuque, US (DBQ)",
            "city": "Dubuque",
            "country": "US",
            "iata": "DBQ",
            "airport": "Dubuque Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Duluth, US (DLH)",
            "city": "Duluth",
            "country": "US",
            "iata": "DLH",
            "airport": "Duluth International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Dumaguete, Philippines (DGT)",
            "city": "Dumaguete",
            "country": "Philippines",
            "iata": "DGT",
            "airport": "Sibulan Airport"
          },
          {
            "label": "Dundee, UK (DND)",
            "city": "Dundee",
            "country": "UK",
            "iata": "DND",
            "airport": "Dundee Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Dunedin, New Zealand (DUD)",
            "city": "Dunedin",
            "country": "New Zealand",
            "iata": "DUD",
            "airport": "Dunedin Airport"
          },
          {
            "label": "Dunhuang, China (DNH)",
            "city": "Dunhuang",
            "country": "China",
            "iata": "DNH",
            "airport": "Dunhuang Airport"
          },
          {
            "label": "Durango, Mexico (DGO)",
            "city": "Durango",
            "country": "Mexico",
            "iata": "DGO",
            "airport": "General Guadalupe Victoria International Airport"
          },
          {
            "label": "Dushanbe, Tajikistan (DYU)",
            "city": "Dushanbe",
            "country": "Tajikistan",
            "iata": "DYU",
            "airport": "Dushanbe Airport"
          },
          {
            "label": "Dutch Harbor, US (DUT)",
            "city": "Dutch Harbor",
            "country": "US",
            "iata": "DUT",
            "airport": "Unalaska Airport",
            "currency_code": "USD"
          },
          {
            "label": "Dzaoudzi, Mayotte (DZA)",
            "city": "Dzaoudzi",
            "country": "Mayotte",
            "iata": "DZA",
            "airport": "Dzaoudzi Pamandzi International Airport"
          },
          {
            "label": "East london, South Africa (ELS)",
            "city": "East london",
            "country": "South Africa",
            "iata": "ELS",
            "airport": "Ben Schoeman Airport"
          },
          {
            "label": "East Main, Canada (ZEM)",
            "city": "East Main",
            "country": "Canada",
            "iata": "ZEM",
            "airport": "Eastmain River Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Easter Island, Chile (IPC)",
            "city": "Easter Island",
            "country": "Chile",
            "iata": "IPC",
            "airport": "Mataveri Airport"
          },
          {
            "label": "Eau Claire, US (EAU)",
            "city": "Eau Claire",
            "country": "US",
            "iata": "EAU",
            "airport": "Chippewa Valley Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Edremit/Korfez, Turkey (EDO)",
            "city": "Edremit/Korfez",
            "country": "Turkey",
            "iata": "EDO",
            "airport": ""
          },
          {
            "label": "Edward River, Australia (EDR)",
            "city": "Edward River",
            "country": "Australia",
            "iata": "EDR",
            "airport": "Pormpuraaw Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Eek, US (EEK)",
            "city": "Eek",
            "country": "US",
            "iata": "EEK",
            "airport": "Eek Airport",
            "currency_code": "USD"
          },
          {
            "label": "Egilsstadir, Iceland (EGS)",
            "city": "Egilsstadir",
            "country": "Iceland",
            "iata": "EGS",
            "airport": "",
            "currency_code": "ISK"
          },
          {
            "label": "Eilat, Israel (ETH)",
            "city": "Eilat",
            "country": "Israel",
            "iata": "ETH",
            "airport": "Eilat Airport",
            "currency_code": "ILS"
          },
          {
            "label": "Eindhoven, Netherlands (EIN)",
            "city": "Eindhoven",
            "country": "Netherlands",
            "iata": "EIN",
            "airport": "Eindhoven Airport"
          },
          {
            "label": "Ekaterinburg, Russia (SVX)",
            "city": "Ekaterinburg",
            "country": "Russia",
            "iata": "SVX",
            "airport": "Koltsovo Airport"
          },
          {
            "label": "Ekwok, US (KEK)",
            "city": "Ekwok",
            "country": "US",
            "iata": "KEK",
            "airport": "Ekwok Airport",
            "currency_code": "USD"
          },
          {
            "label": "El Calafate, Argentina (FTE)",
            "city": "El Calafate",
            "country": "Argentina",
            "iata": "FTE",
            "airport": "El Calafate Airport",
            "currency_code": "ARS"
          },
          {
            "label": "El Dorado, US (ELD)",
            "city": "El Dorado",
            "country": "US",
            "iata": "ELD",
            "airport": "South Arkansas Regional At Goodwin Field",
            "currency_code": "USD"
          },
          {
            "label": "El Nido, Philippines (ENI)",
            "city": "El Nido",
            "country": "Philippines",
            "iata": "ENI",
            "airport": "El Nido Airport"
          },
          {
            "label": "El Paso, US (ELP)",
            "city": "El Paso",
            "country": "US",
            "iata": "ELP",
            "airport": "El Paso International Airport",
            "currency_code": "USD"
          },
          {
            "label": "El Salvador, Chile (ESR)",
            "city": "El Salvador",
            "country": "Chile",
            "iata": "ESR",
            "airport": ""
          },
          {
            "label": "El Vigia, Venezuela (VIG)",
            "city": "El Vigia",
            "country": "Venezuela",
            "iata": "VIG",
            "airport": ""
          },
          {
            "label": "El Yopal, Colombia (EYP)",
            "city": "El Yopal",
            "country": "Colombia",
            "iata": "EYP",
            "airport": "El Yopal Airport",
            "currency_code": "COP"
          },
          {
            "label": "Elazig, Turkey (EZS)",
            "city": "Elazig",
            "country": "Turkey",
            "iata": "EZS",
            "airport": "Elaz?? Airport"
          },
          {
            "label": "Elcho Island, Australia (ELC)",
            "city": "Elcho Island",
            "country": "Australia",
            "iata": "ELC",
            "airport": "Elcho Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Eldoret, Kenya (EDL)",
            "city": "Eldoret",
            "country": "Kenya",
            "iata": "EDL",
            "airport": "Eldoret International Airport"
          },
          {
            "label": "Elko, US (EKO)",
            "city": "Elko",
            "country": "US",
            "iata": "EKO",
            "airport": "Elko Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Elorza, Venezuela (EOZ)",
            "city": "Elorza",
            "country": "Venezuela",
            "iata": "EOZ",
            "airport": "Elorza Airport"
          },
          {
            "label": "Emae, Vanuatu (EAE)",
            "city": "Emae",
            "country": "Vanuatu",
            "iata": "EAE",
            "airport": "Sangafa Airport"
          },
          {
            "label": "Emerald, Australia (EMD)",
            "city": "Emerald",
            "country": "Australia",
            "iata": "EMD",
            "airport": "Emerald Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Ende, Indonesia (ENE)",
            "city": "Ende",
            "country": "Indonesia",
            "iata": "ENE",
            "airport": "Ende (H Hasan Aroeboesman) Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Eniseysk, Russia (EIE)",
            "city": "Eniseysk",
            "country": "Russia",
            "iata": "EIE",
            "airport": "Yeniseysk Airport"
          },
          {
            "label": "Enontekio, Finland (ENF)",
            "city": "Enontekio",
            "country": "Finland",
            "iata": "ENF",
            "airport": "Enontekio Airport"
          },
          {
            "label": "Enshi, China (ENH)",
            "city": "Enshi",
            "country": "China",
            "iata": "ENH",
            "airport": "Enshi Airport"
          },
          {
            "label": "Ercan, Cyprus (ECN)",
            "city": "Ercan",
            "country": "Cyprus",
            "iata": "ECN",
            "airport": "Ercan International Airport"
          },
          {
            "label": "Erfurt, Germany (ERF)",
            "city": "Erfurt",
            "country": "Germany",
            "iata": "ERF",
            "airport": "Erfurt Airport"
          },
          {
            "label": "Erie, US (ERI)",
            "city": "Erie",
            "country": "US",
            "iata": "ERI",
            "airport": "Erie International Tom Ridge Field",
            "currency_code": "USD"
          },
          {
            "label": "Errachidia, Morocco (ERH)",
            "city": "Errachidia",
            "country": "Morocco",
            "iata": "ERH",
            "airport": "Moulay Ali Cherif Airport"
          },
          {
            "label": "Erzincan, Turkey (ERC)",
            "city": "Erzincan",
            "country": "Turkey",
            "iata": "ERC",
            "airport": "Erzincan Airport"
          },
          {
            "label": "Erzurum, Turkey (ERZ)",
            "city": "Erzurum",
            "country": "Turkey",
            "iata": "ERZ",
            "airport": "Erzurum International Airport"
          },
          {
            "label": "Esbjerg, Denmark (EBJ)",
            "city": "Esbjerg",
            "country": "Denmark",
            "iata": "EBJ",
            "airport": "Esbjerg Airport"
          },
          {
            "label": "Eskisehir, Turkey (AOE)",
            "city": "Eskisehir",
            "country": "Turkey",
            "iata": "AOE",
            "airport": "Anadolu University Airport"
          },
          {
            "label": "Esmeraldas, Ecuador (ESM)",
            "city": "Esmeraldas",
            "country": "Ecuador",
            "iata": "ESM",
            "airport": "General Rivadeneira Airport"
          },
          {
            "label": "Esperance, Australia (EPR)",
            "city": "Esperance",
            "country": "Australia",
            "iata": "EPR",
            "airport": "Esperance Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Espiritu Santo, Vanuatu (SON)",
            "city": "Espiritu Santo",
            "country": "Vanuatu",
            "iata": "SON",
            "airport": "Santo Pekoa International Airport"
          },
          {
            "label": "Esquel, Argentina (EQS)",
            "city": "Esquel",
            "country": "Argentina",
            "iata": "EQS",
            "airport": "Brigadier Antonio Parodi Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Essaouira, Morocco (ESU)",
            "city": "Essaouira",
            "country": "Morocco",
            "iata": "ESU",
            "airport": "Mogador Airport"
          },
          {
            "label": "Eua, Tonga (EUA)",
            "city": "Eua",
            "country": "Tonga",
            "iata": "EUA",
            "airport": "Kaufana Airport"
          },
          {
            "label": "Eugene, US (EUG)",
            "city": "Eugene",
            "country": "US",
            "iata": "EUG",
            "airport": "Mahlon Sweet Field",
            "currency_code": "USD"
          },
          {
            "label": "Evansville, US (EVV)",
            "city": "Evansville",
            "country": "US",
            "iata": "EVV",
            "airport": "Evansville Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Excursion Inlet, US (EXI)",
            "city": "Excursion Inlet",
            "country": "US",
            "iata": "EXI",
            "airport": "Excursion Inlet Seaplane Base",
            "currency_code": "USD"
          },
          {
            "label": "Exeter, UK (EXT)",
            "city": "Exeter",
            "country": "UK",
            "iata": "EXT",
            "airport": "Exeter International Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Fagernes, Norway (VDB)",
            "city": "Fagernes",
            "country": "Norway",
            "iata": "VDB",
            "airport": "Leirin Airport"
          },
          {
            "label": "Fairbanks, US (FAI)",
            "city": "Fairbanks",
            "country": "US",
            "iata": "FAI",
            "airport": "Fairbanks International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Fakfak, Indonesia (FKQ)",
            "city": "Fakfak",
            "country": "Indonesia",
            "iata": "FKQ",
            "airport": "Fakfak Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Fall River/New Bedford, US (EWB)",
            "city": "Fall River/New Bedford",
            "country": "US",
            "iata": "EWB",
            "airport": "New Bedford Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "False Pass, US (KFP)",
            "city": "False Pass",
            "country": "US",
            "iata": "KFP",
            "airport": "False Pass Airport",
            "currency_code": "USD"
          },
          {
            "label": "Farafangana, Madagascar (RVA)",
            "city": "Farafangana",
            "country": "Madagascar",
            "iata": "RVA",
            "airport": "Farafangana Airport"
          },
          {
            "label": "Fargo, US (FAR)",
            "city": "Fargo",
            "country": "US",
            "iata": "FAR",
            "airport": "Hector International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Farnborough, UK (FAB)",
            "city": "Farnborough",
            "country": "UK",
            "iata": "FAB",
            "airport": "Farnborough Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Faro, Portugal (FAO)",
            "city": "Faro",
            "country": "Portugal",
            "iata": "FAO",
            "airport": "Faro Airport"
          },
          {
            "label": "Faroe Islands, Faroe Islands (FAE)",
            "city": "Faroe Islands",
            "country": "Faroe Islands",
            "iata": "FAE",
            "airport": "Vagar Airport"
          },
          {
            "label": "Faya, Chad (FYT)",
            "city": "Faya",
            "country": "Chad",
            "iata": "FYT",
            "airport": "Faya Largeau Airport"
          },
          {
            "label": "Fayetteville, US (FAY)",
            "city": "Fayetteville",
            "country": "US",
            "iata": "FAY",
            "airport": "Fayetteville Regional Grannis Field",
            "currency_code": "USD"
          },
          {
            "label": "Fera Island, Solomon Islands (FRE)",
            "city": "Fera Island",
            "country": "Solomon Islands",
            "iata": "FRE",
            "airport": "Fera/Maringe Airport"
          },
          {
            "label": "Fergana, Uzbekistan (FEG)",
            "city": "Fergana",
            "country": "Uzbekistan",
            "iata": "FEG",
            "airport": "Fergana Airport"
          },
          {
            "label": "Fernando De Noronha, Brazil (FEN)",
            "city": "Fernando De Noronha",
            "country": "Brazil",
            "iata": "FEN",
            "airport": "Fernando de Noronha Airport"
          },
          {
            "label": "Fez, Morocco (FEZ)",
            "city": "Fez",
            "country": "Morocco",
            "iata": "FEZ",
            "airport": ""
          },
          {
            "label": "Figari, France (FSC)",
            "city": "Figari",
            "country": "France",
            "iata": "FSC",
            "airport": "Figari Sud-Corse Airport"
          },
          {
            "label": "Filton, UK (FZO)",
            "city": "Filton",
            "country": "UK",
            "iata": "FZO",
            "airport": "Bristol Filton Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Flagstaff, US (FLG)",
            "city": "Flagstaff",
            "country": "US",
            "iata": "FLG",
            "airport": "Flagstaff Pulliam Airport",
            "currency_code": "USD"
          },
          {
            "label": "Flin Flon, Canada (YFO)",
            "city": "Flin Flon",
            "country": "Canada",
            "iata": "YFO",
            "airport": "Flin Flon Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Flint, US (FNT)",
            "city": "Flint",
            "country": "US",
            "iata": "FNT",
            "airport": "Bishop International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Florence, Italy (FLR)",
            "city": "Florence",
            "country": "Italy",
            "iata": "FLR",
            "airport": "Firenze / Peretola Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Florence, US (FLO)",
            "city": "Florence",
            "country": "US",
            "iata": "FLO",
            "airport": "Florence Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Florence, US (MSL)",
            "city": "Florence",
            "country": "US",
            "iata": "MSL",
            "airport": "Northwest Alabama Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Florencia, Colombia (FLA)",
            "city": "Florencia",
            "country": "Colombia",
            "iata": "FLA",
            "airport": "Gustavo Artunduaga Paredes Airport",
            "currency_code": "COP"
          },
          {
            "label": "Flores Island, Portugal (FLW)",
            "city": "Flores Island",
            "country": "Portugal",
            "iata": "FLW",
            "airport": "Flores Airport"
          },
          {
            "label": "Florianpolis, Brazil (FLN)",
            "city": "Florianapolis",
            "country": "Brazil",
            "iata": "FLN",
            "airport": "Hercílio Luz International Airport"
          },
          {
            "label": "Floro, Norway (FRO)",
            "city": "Floro",
            "country": "Norway",
            "iata": "FRO",
            "airport": ""
          },
          {
            "label": "Foggia, Italy (FOG)",
            "city": "Foggia",
            "country": "Italy",
            "iata": "FOG",
            "airport": "Foggia / Gino Lisa Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Forde, Norway (FDE)",
            "city": "Forde",
            "country": "Norway",
            "iata": "FDE",
            "airport": "Bringeland Airport"
          },
          {
            "label": "Forli, Italy (FRL)",
            "city": "Forli",
            "country": "Italy",
            "iata": "FRL",
            "airport": "",
            "currency_code": "EUR"
          },
          {
            "label": "Formosa, Argentina (FMA)",
            "city": "Formosa",
            "country": "Argentina",
            "iata": "FMA",
            "airport": "Formosa Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Fort Albany, Canada (YFA)",
            "city": "Fort Albany",
            "country": "Canada",
            "iata": "YFA",
            "airport": "Fort Albany Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Fort Dauphin, Madagascar (FTU)",
            "city": "Fort Dauphin",
            "country": "Madagascar",
            "iata": "FTU",
            "airport": ""
          },
          {
            "label": "Fort Dodge, US (FOD)",
            "city": "Fort Dodge",
            "country": "US",
            "iata": "FOD",
            "airport": "Fort Dodge Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Fort Frances, Canada (YAG)",
            "city": "Fort Frances",
            "country": "Canada",
            "iata": "YAG",
            "airport": "Fort Frances Municipal Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Fort Good Hope, Canada (YGH)",
            "city": "Fort Good Hope",
            "country": "Canada",
            "iata": "YGH",
            "airport": "Fort Good Hope Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Fort Hope, Canada (YFH)",
            "city": "Fort Hope",
            "country": "Canada",
            "iata": "YFH",
            "airport": "Fort Hope Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Fort Lauderdale, US (FLL)",
            "city": "Fort Lauderdale",
            "country": "US",
            "iata": "FLL",
            "airport": "Fort Lauderdale Hollywood International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Fort Leonard Wood, US (TBN)",
            "city": "Fort Leonard Wood",
            "country": "US",
            "iata": "TBN",
            "airport": "Waynesville-St. Robert Regional Forney field",
            "currency_code": "USD"
          },
          {
            "label": "Fort McMurray, Canada (YMM)",
            "city": "Fort McMurray",
            "country": "Canada",
            "iata": "YMM",
            "airport": "Fort McMurray Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Fort Mcpherson, Canada (ZFM)",
            "city": "Fort Mcpherson",
            "country": "Canada",
            "iata": "ZFM",
            "airport": "Fort Mcpherson Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Fort Myers, US (RSW)",
            "city": "Fort Myers",
            "country": "US",
            "iata": "RSW",
            "airport": "Southwest Florida International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Fort Nelson, Canada (YYE)",
            "city": "Fort Nelson",
            "country": "Canada",
            "iata": "YYE",
            "airport": "Fort Nelson Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Fort Severn, Canada (YER)",
            "city": "Fort Severn",
            "country": "Canada",
            "iata": "YER",
            "airport": "Fort Severn Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Fort Simpson, Canada (YFS)",
            "city": "Fort Simpson",
            "country": "Canada",
            "iata": "YFS",
            "airport": "Fort Simpson Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Fort Smith, Canada (YSM)",
            "city": "Fort Smith",
            "country": "Canada",
            "iata": "YSM",
            "airport": "Fort Smith Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Fort Smith, US (FSM)",
            "city": "Fort Smith",
            "country": "US",
            "iata": "FSM",
            "airport": "Fort Smith Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Fort St John, Canada (YXJ)",
            "city": "Fort St John",
            "country": "Canada",
            "iata": "YXJ",
            "airport": "Fort St John Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Fort Wayne, US (FWA)",
            "city": "Fort Wayne",
            "country": "US",
            "iata": "FWA",
            "airport": "Fort Wayne International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Fort Yukon, US (FYU)",
            "city": "Fort Yukon",
            "country": "US",
            "iata": "FYU",
            "airport": "Fort Yukon Airport",
            "currency_code": "USD"
          },
          {
            "label": "Fortaleza, Brazil (FOR)",
            "city": "Fortaleza",
            "country": "Brazil",
            "iata": "FOR",
            "airport": "Pinto Martins International Airport"
          },
          {
            "label": "Fox Harbour (St Lewis),  Canada (YFX)",
            "city": "Fox Harbour (St Lewis)",
            "country": " Canada",
            "iata": "YFX",
            "airport": "St. Lewis (Fox Harbour) Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Franca, Brazil (FRC)",
            "city": "Franca",
            "country": "Brazil",
            "iata": "FRC",
            "airport": "Franca Airport"
          },
          {
            "label": "Franceville, Gabon (MVB)",
            "city": "Franceville",
            "country": "Gabon",
            "iata": "MVB",
            "airport": "M'Vengue El Hadj Omar Bongo Ondimba International Airport"
          },
          {
            "label": "Fredericton, Canada (YFC)",
            "city": "Fredericton",
            "country": "Canada",
            "iata": "YFC",
            "airport": "Fredericton Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Freetown, Sierra Leone (FNA)",
            "city": "Freetown",
            "country": "Sierra Leone",
            "iata": "FNA",
            "airport": "Lungi International Airport"
          },
          {
            "label": "Fresno, US (FAT)",
            "city": "Fresno",
            "country": "US",
            "iata": "FAT",
            "airport": "Fresno Yosemite International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Friday Harbor, US (FRD)",
            "city": "Friday Harbor",
            "country": "US",
            "iata": "FRD",
            "airport": "Friday Harbor Airport",
            "currency_code": "USD"
          },
          {
            "label": "Friedrichshafen, Germany (FDH)",
            "city": "Friedrichshafen",
            "country": "Germany",
            "iata": "FDH",
            "airport": "Friedrichshafen Airport"
          },
          {
            "label": "Fuerteventura, Spain (FUE)",
            "city": "Fuerteventura",
            "country": "Spain",
            "iata": "FUE",
            "airport": "Fuerteventura Airport"
          },
          {
            "label": "Fukue, Japan (FUJ)",
            "city": "Fukue",
            "country": "Japan",
            "iata": "FUJ",
            "airport": "Fukue Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Fukuoka, Japan (FUK)",
            "city": "Fukuoka",
            "country": "Japan",
            "iata": "FUK",
            "airport": "Fukuoka Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Fukushima, Japan (FKS)",
            "city": "Fukushima",
            "country": "Japan",
            "iata": "FKS",
            "airport": "Fukushima Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Funafuti Atol, Tuvalu (FUN)",
            "city": "Funafuti Atol",
            "country": "Tuvalu",
            "iata": "FUN",
            "airport": "Funafuti International Airport"
          },
          {
            "label": "Futuna Island, Vanuatu (FTA)",
            "city": "Futuna Island",
            "country": "Vanuatu",
            "iata": "FTA",
            "airport": "Futuna Airport"
          },
          {
            "label": "Futuna Island, Wallis and Futuna (FUT)",
            "city": "Futuna Island",
            "country": "Wallis and Futuna",
            "iata": "FUT",
            "airport": "Pointe Vele Airport"
          },
          {
            "label": "Fuzhou, China (FOC)",
            "city": "Fuzhou",
            "country": "China",
            "iata": "FOC",
            "airport": "Fuzhou Changle International Airport"
          },
          {
            "label": "Gaberone, Botswana (GBE)",
            "city": "Gaberone",
            "country": "Botswana",
            "iata": "GBE",
            "airport": "Sir Seretse Khama International Airport"
          },
          {
            "label": "Gafsa, Tunisia (GAF)",
            "city": "Gafsa",
            "country": "Tunisia",
            "iata": "GAF",
            "airport": "Gafsa Ksar International Airport"
          },
          {
            "label": "Gainesville, US (GNV)",
            "city": "Gainesville",
            "country": "US",
            "iata": "GNV",
            "airport": "Gainesville Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Galapagos Is, Ecuador (GPS)",
            "city": "Galapagos Is",
            "country": "Ecuador",
            "iata": "GPS",
            "airport": "Seymour Airport"
          },
          {
            "label": "Galena, US (GAL)",
            "city": "Galena",
            "country": "US",
            "iata": "GAL",
            "airport": "Edward G. Pitka Sr Airport",
            "currency_code": "USD"
          },
          {
            "label": "Gallivare, Sweden (GEV)",
            "city": "Gallivare",
            "country": "Sweden",
            "iata": "GEV",
            "airport": ""
          },
          {
            "label": "Gallup, US (GUP)",
            "city": "Gallup",
            "country": "US",
            "iata": "GUP",
            "airport": "Gallup Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Galway, Ireland (GWY)",
            "city": "Galway",
            "country": "Ireland",
            "iata": "GWY",
            "airport": "Galway Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Gamba, Gabon (GAX)",
            "city": "Gamba",
            "country": "Gabon",
            "iata": "GAX",
            "airport": "Gamba Airport"
          },
          {
            "label": "Gambela, Ethiopia (GMB)",
            "city": "Gambela",
            "country": "Ethiopia",
            "iata": "GMB",
            "airport": "Gambella Airport"
          },
          {
            "label": "Gambell, US (GAM)",
            "city": "Gambell",
            "country": "US",
            "iata": "GAM",
            "airport": "Gambell Airport",
            "currency_code": "USD"
          },
          {
            "label": "Gan Island, Maldives (GAN)",
            "city": "Gan Island",
            "country": "Maldives",
            "iata": "GAN",
            "airport": "Gan International Airport"
          },
          {
            "label": "Gander, Canada (YQX)",
            "city": "Gander",
            "country": "Canada",
            "iata": "YQX",
            "airport": "Gander International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Ganzhou, China (KOW)",
            "city": "Ganzhou",
            "country": "China",
            "iata": "KOW",
            "airport": "Ganzhou Airport"
          },
          {
            "label": "Garden City, US (GCK)",
            "city": "Garden City",
            "country": "US",
            "iata": "GCK",
            "airport": "Garden City Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Gasmata Island, Papua New Guinea (GMI)",
            "city": "Gasmata Island",
            "country": "Papua New Guinea",
            "iata": "GMI",
            "airport": "Gasmata Island Airport"
          },
          {
            "label": "Gassim, Saudi Arabia (ELQ)",
            "city": "Gassim",
            "country": "Saudi Arabia",
            "iata": "ELQ",
            "airport": "Gassim Airport"
          },
          {
            "label": "Gatokae, Solomon Islands (GTA)",
            "city": "Gatokae",
            "country": "Solomon Islands",
            "iata": "GTA",
            "airport": "Gatokae Airport"
          },
          {
            "label": "Gaua, Vanuatu (ZGU)",
            "city": "Gaua",
            "country": "Vanuatu",
            "iata": "ZGU",
            "airport": "Gaua Island Airport"
          },
          {
            "label": "Gaziantep, Turkey (GZT)",
            "city": "Gaziantep",
            "country": "Turkey",
            "iata": "GZT",
            "airport": "Gaziantep International Airport"
          },
          {
            "label": "Gdansk, Poland (GDN)",
            "city": "Gdansk",
            "country": "Poland",
            "iata": "GDN",
            "airport": "Gdansk Lech Walesa Airport"
          },
          {
            "label": "General Santos, Philippines (GES)",
            "city": "General Santos",
            "country": "Philippines",
            "iata": "GES",
            "airport": "General Santos International Airport"
          },
          {
            "label": "Genoa, Italy (GOA)",
            "city": "Genoa",
            "country": "Italy",
            "iata": "GOA",
            "airport": "Genova / Sestri Cristoforo Colombo Airport",
            "currency_code": "EUR"
          },
          {
            "label": "George, South Africa (GRJ)",
            "city": "George",
            "country": "South Africa",
            "iata": "GRJ",
            "airport": "George Airport"
          },
          {
            "label": "Georgetown, Guyana (GEO)",
            "city": "Georgetown",
            "country": "Guyana",
            "iata": "GEO",
            "airport": "Cheddi Jagan International Airport"
          },
          {
            "label": "Georgetown, Saint Helena (ASI)",
            "city": "Georgetown",
            "country": "Saint Helena",
            "iata": "ASI",
            "airport": "RAF Ascension Island"
          },
          {
            "label": "Geraldton, Australia (GET)",
            "city": "Geraldton",
            "country": "Australia",
            "iata": "GET",
            "airport": "Geraldton Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Gerona, Spain (GRO)",
            "city": "Gerona",
            "country": "Spain",
            "iata": "GRO",
            "airport": "Girona Airport"
          },
          {
            "label": "Gibraltar, Gibraltar (GIB)",
            "city": "Gibraltar",
            "country": "Gibraltar",
            "iata": "GIB",
            "airport": "Gibraltar Airport"
          },
          {
            "label": "Gillam, Canada (YGX)",
            "city": "Gillam",
            "country": "Canada",
            "iata": "YGX",
            "airport": "Gillam Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Gillies Bay, Canada (YGB)",
            "city": "Gillies Bay",
            "country": "Canada",
            "iata": "YGB",
            "airport": "Texada Gillies Bay Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Gisborne, New Zealand (GIS)",
            "city": "Gisborne",
            "country": "New Zealand",
            "iata": "GIS",
            "airport": "Gisborne Airport"
          },
          {
            "label": "Gizo, Solomon Islands (GZO)",
            "city": "Gizo",
            "country": "Solomon Islands",
            "iata": "GZO",
            "airport": "Nusatupe Airport"
          },
          {
            "label": "Gjoa Haven, Canada (YHK)",
            "city": "Gjoa Haven",
            "country": "Canada",
            "iata": "YHK",
            "airport": "Gjoa Haven Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Gladewater, US (GGG)",
            "city": "Gladewater",
            "country": "US",
            "iata": "GGG",
            "airport": "East Texas Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Gladstone, Australia (GLT)",
            "city": "Gladstone",
            "country": "Australia",
            "iata": "GLT",
            "airport": "Gladstone Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Gloucester, UK (GLO)",
            "city": "Gloucester",
            "country": "UK",
            "iata": "GLO",
            "airport": "Gloucestershire Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Gode/Iddidole, Ethiopia (GDE)",
            "city": "Gode/Iddidole",
            "country": "Ethiopia",
            "iata": "GDE",
            "airport": "Gode Airport"
          },
          {
            "label": "Gods Narrows, Canada (YGO)",
            "city": "Gods Narrows",
            "country": "Canada",
            "iata": "YGO",
            "airport": "Gods Lake Narrows Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Gods River, Canada (ZGI)",
            "city": "Gods River",
            "country": "Canada",
            "iata": "ZGI",
            "airport": "Gods River Airport",
            "currency_code": "CAD"
          },
          {
            "label": "GoiÃƒÂ¢nia, Brazil (GYN)",
            "city": "GoiÃƒÂ¢nia",
            "country": "Brazil",
            "iata": "GYN",
            "airport": "Santa Genoveva Airport"
          },
          {
            "label": "Gold Coast, Australia (OOL)",
            "city": "Gold Coast",
            "country": "Australia",
            "iata": "OOL",
            "airport": "Gold Coast Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Golmud, China (GOQ)",
            "city": "Golmud",
            "country": "China",
            "iata": "GOQ",
            "airport": "Golmud Airport"
          },
          {
            "label": "Goma, Democratic Republic of the Congo (GOM)",
            "city": "Goma",
            "country": "Democratic Republic of the Congo",
            "iata": "GOM",
            "airport": "Goma International Airport"
          },
          {
            "label": "Gomel, Belarus (GME)",
            "city": "Gomel",
            "country": "Belarus",
            "iata": "GME",
            "airport": "Gomel Airport"
          },
          {
            "label": "Gondar, Ethiopia (GDQ)",
            "city": "Gondar",
            "country": "Ethiopia",
            "iata": "GDQ",
            "airport": "Gonder Airport"
          },
          {
            "label": "Goodnews Bay, US (GNU)",
            "city": "Goodnews Bay",
            "country": "US",
            "iata": "GNU",
            "airport": "Goodnews Airport",
            "currency_code": "USD"
          },
          {
            "label": "Goose Bay, Canada (YYR)",
            "city": "Goose Bay",
            "country": "Canada",
            "iata": "YYR",
            "airport": "Goose Bay Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Goroka, Papua New Guinea (GKA)",
            "city": "Goroka",
            "country": "Papua New Guinea",
            "iata": "GKA",
            "airport": "Goroka Airport"
          },
          {
            "label": "Gorontalo, Indonesia (GTO)",
            "city": "Gorontalo",
            "country": "Indonesia",
            "iata": "GTO",
            "airport": "Jalaluddin Airport",
            "currency_code": "IDR"
          },
          {
            "label": "GÃƒÂ¶teborg, Sweden (GOT)",
            "city": "GÃƒÂ¶teborg",
            "country": "Sweden",
            "iata": "GOT",
            "airport": "Gothenburg-Landvetter Airport"
          },
          {
            "label": "GÃƒÂ¶teborg, Sweden (GSE)",
            "city": "GÃƒÂ¶teborg",
            "country": "Sweden",
            "iata": "GSE",
            "airport": "Gothenburg City Airport"
          },
          {
            "label": "Goulimime, Morocco (GLN)",
            "city": "Goulimime",
            "country": "Morocco",
            "iata": "GLN",
            "airport": "Goulimime Airport"
          },
          {
            "label": "Gove, Australia (GOV)",
            "city": "Gove",
            "country": "Australia",
            "iata": "GOV",
            "airport": "Gove Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Governador Valadares, Brazil (GVR)",
            "city": "Governador Valadares",
            "country": "Brazil",
            "iata": "GVR",
            "airport": "Governador Valadares Airport"
          },
          {
            "label": "Graciosa Island, Portugal (GRW)",
            "city": "Graciosa Island",
            "country": "Portugal",
            "iata": "GRW",
            "airport": "Graciosa Airport"
          },
          {
            "label": "Grafton, Australia (GFN)",
            "city": "Grafton",
            "country": "Australia",
            "iata": "GFN",
            "airport": "Grafton Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Granada, Spain (GRX)",
            "city": "Granada",
            "country": "Spain",
            "iata": "GRX",
            "airport": "Federico Garcia Lorca Airport"
          },
          {
            "label": "Grand Canyon, US (GCN)",
            "city": "Grand Canyon",
            "country": "US",
            "iata": "GCN",
            "airport": "Grand Canyon National Park Airport",
            "currency_code": "USD"
          },
          {
            "label": "Grand Forks, US (GFK)",
            "city": "Grand Forks",
            "country": "US",
            "iata": "GFK",
            "airport": "Grand Forks International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Grand Island, US (GRI)",
            "city": "Grand Island",
            "country": "US",
            "iata": "GRI",
            "airport": "Central Nebraska Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Grand Junction, US (GJT)",
            "city": "Grand Junction",
            "country": "US",
            "iata": "GJT",
            "airport": "Grand Junction Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Grand Rapids, US (GRR)",
            "city": "Grand Rapids",
            "country": "US",
            "iata": "GRR",
            "airport": "Gerald R. Ford International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Grande Prairie, Canada (YQU)",
            "city": "Grande Prairie",
            "country": "Canada",
            "iata": "YQU",
            "airport": "Grande Prairie Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Granites, Australia (GTS)",
            "city": "Granites",
            "country": "Australia",
            "iata": "GTS",
            "airport": "Granite Downs Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Graz, Austria (GRZ)",
            "city": "Graz",
            "country": "Austria",
            "iata": "GRZ",
            "airport": "Graz Airport"
          },
          {
            "label": "Great Falls, US (GTF)",
            "city": "Great Falls",
            "country": "US",
            "iata": "GTF",
            "airport": "Great Falls International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Green Bay, US (GRB)",
            "city": "Green Bay",
            "country": "US",
            "iata": "GRB",
            "airport": "Austin Straubel International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Greensboro, US (GSO)",
            "city": "Greensboro",
            "country": "US",
            "iata": "GSO",
            "airport": "Piedmont Triad International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Greenville, US (GLH)",
            "city": "Greenville",
            "country": "US",
            "iata": "GLH",
            "airport": "Mid Delta Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Greenville/Greer, US (GSP)",
            "city": "Greenville/Greer",
            "country": "US",
            "iata": "GSP",
            "airport": "Greenville Spartanburg International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Grenoble, France (GNB)",
            "city": "Grenoble",
            "country": "France",
            "iata": "GNB",
            "airport": ""
          },
          {
            "label": "Griffith, Australia (GFF)",
            "city": "Griffith",
            "country": "Australia",
            "iata": "GFF",
            "airport": "Griffith Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Grimsby, UK (GSY)",
            "city": "Grimsby",
            "country": "UK",
            "iata": "GSY",
            "airport": "Binbrook Airfield",
            "currency_code": "GBP"
          },
          {
            "label": "Grimsey, Iceland (GRY)",
            "city": "Grimsey",
            "country": "Iceland",
            "iata": "GRY",
            "airport": "",
            "currency_code": "ISK"
          },
          {
            "label": "Grise Fiord, Canada (YGZ)",
            "city": "Grise Fiord",
            "country": "Canada",
            "iata": "YGZ",
            "airport": "Grise Fiord Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Groningen, Netherlands (GRQ)",
            "city": "Groningen",
            "country": "Netherlands",
            "iata": "GRQ",
            "airport": "Eelde Airport"
          },
          {
            "label": "Groote Eylandt, Australia (GTE)",
            "city": "Groote Eylandt",
            "country": "Australia",
            "iata": "GTE",
            "airport": "Groote Eylandt Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Groznyj, Russia (GRV)",
            "city": "Groznyj",
            "country": "Russia",
            "iata": "GRV",
            "airport": "Grozny North Airport"
          },
          {
            "label": "Guadalajara, Mexico (GDL)",
            "city": "Guadalajara",
            "country": "Mexico",
            "iata": "GDL",
            "airport": "Don Miguel Hidalgo Y Costilla International Airport"
          },
          {
            "label": "Guam, Guam (GUM)",
            "city": "Guam",
            "country": "Guam",
            "iata": "GUM",
            "airport": "Antonio B. Won Pat International Airport"
          },
          {
            "label": "Guapi, Colombia (GPI)",
            "city": "Guapi",
            "country": "Colombia",
            "iata": "GPI",
            "airport": "Juan Casiano Airport",
            "currency_code": "COP"
          },
          {
            "label": "Guasdualito, Venezuela (GDO)",
            "city": "Guasdualito",
            "country": "Venezuela",
            "iata": "GDO",
            "airport": "Guasdalito Airport"
          },
          {
            "label": "Guayaquil, Ecuador (GYE)",
            "city": "Guayaquil",
            "country": "Ecuador",
            "iata": "GYE",
            "airport": "Simon Bolivar International Airport"
          },
          {
            "label": "Guayaramerin, Bolivia (GYA)",
            "city": "Guayaramerin",
            "country": "Bolivia",
            "iata": "GYA",
            "airport": ""
          },
          {
            "label": "Guaymas, Mexico (GYM)",
            "city": "Guaymas",
            "country": "Mexico",
            "iata": "GYM",
            "airport": ""
          },
          {
            "label": "Guernsey, UK (GCI)",
            "city": "Guernsey",
            "country": "UK",
            "iata": "GCI",
            "airport": "Guernsey Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Guilin, China (KWL)",
            "city": "Guilin",
            "country": "China",
            "iata": "KWL",
            "airport": "Guilin Liangjiang International Airport"
          },
          {
            "label": "Guiyang, China (KWE)",
            "city": "Guiyang",
            "country": "China",
            "iata": "KWE",
            "airport": "Longdongbao Airport"
          },
          {
            "label": "Gulfport, US (GPT)",
            "city": "Gulfport",
            "country": "US",
            "iata": "GPT",
            "airport": "Gulfport Biloxi International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Gulu, Uganda (ULU)",
            "city": "Gulu",
            "country": "Uganda",
            "iata": "ULU",
            "airport": "Gulu Airport"
          },
          {
            "label": "Gunsan, South Korea (KUV)",
            "city": "Gunsan",
            "country": "South Korea",
            "iata": "KUV",
            "airport": "Kunsan Air Base"
          },
          {
            "label": "Gurayat, Saudi Arabia (URY)",
            "city": "Gurayat",
            "country": "Saudi Arabia",
            "iata": "URY",
            "airport": "Guriat Domestic Airport"
          },
          {
            "label": "Gustavus, US (GST)",
            "city": "Gustavus",
            "country": "US",
            "iata": "GST",
            "airport": "Gustavus Airport",
            "currency_code": "USD"
          },
          {
            "label": "Gwangju, South Korea (KWJ)",
            "city": "Gwangju",
            "country": "South Korea",
            "iata": "KWJ",
            "airport": "Gwangju Airport"
          },
          {
            "label": "Gyandzha, Azerbaijan (KVD)",
            "city": "Gyandzha",
            "country": "Azerbaijan",
            "iata": "KVD",
            "airport": "Ganja Airport"
          },
          {
            "label": "Gyumri, Armenia (LWN)",
            "city": "Gyumri",
            "country": "Armenia",
            "iata": "LWN",
            "airport": "Gyumri Shirak Airport",
            "currency_code": "AMD"
          },
          {
            "label": "Ha'Apai, Tonga (HPA)",
            "city": "Ha'Apai",
            "country": "Tonga",
            "iata": "HPA",
            "airport": "Lifuka Island Airport"
          },
          {
            "label": "Hachijo Jima, Japan (HAC)",
            "city": "Hachijo Jima",
            "country": "Japan",
            "iata": "HAC",
            "airport": "Hachijojima Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Hafr Albatin, Saudi Arabia (HBT)",
            "city": "Hafr Albatin",
            "country": "Saudi Arabia",
            "iata": "HBT",
            "airport": "King Khaled Military City Airport"
          },
          {
            "label": "Hagfors, Sweden (HFS)",
            "city": "Hagfors",
            "country": "Sweden",
            "iata": "HFS",
            "airport": "Hagfors Airport"
          },
          {
            "label": "Haifa, Israel (HFA)",
            "city": "Haifa",
            "country": "Israel",
            "iata": "HFA",
            "airport": "Haifa International Airport",
            "currency_code": "ILS"
          },
          {
            "label": "Haikou, China (HAK)",
            "city": "Haikou",
            "country": "China",
            "iata": "HAK",
            "airport": "Haikou Meilan International Airport"
          },
          {
            "label": "Ha'il, Saudi Arabia (HAS)",
            "city": "Ha'il",
            "country": "Saudi Arabia",
            "iata": "HAS",
            "airport": "Hail Airport"
          },
          {
            "label": "Hailar, China (HLD)",
            "city": "Hailar",
            "country": "China",
            "iata": "HLD",
            "airport": "Dongshan Airport"
          },
          {
            "label": "Hailey/Sun Valley, US (SUN)",
            "city": "Hailey/Sun Valley",
            "country": "US",
            "iata": "SUN",
            "airport": "Friedman Memorial Airport",
            "currency_code": "USD"
          },
          {
            "label": "Haines, US (HNS)",
            "city": "Haines",
            "country": "US",
            "iata": "HNS",
            "airport": "Haines Airport",
            "currency_code": "USD"
          },
          {
            "label": "Haiphong, Vietnam (HPH)",
            "city": "Haiphong",
            "country": "Vietnam",
            "iata": "HPH",
            "airport": "Cat Bi International Airport"
          },
          {
            "label": "Hakodate, Japan (HKD)",
            "city": "Hakodate",
            "country": "Japan",
            "iata": "HKD",
            "airport": "Hakodate Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Halifax, Canada (YHZ)",
            "city": "Halifax",
            "country": "Canada",
            "iata": "YHZ",
            "airport": "Halifax / Stanfield International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Hall Beach, Canada (YUX)",
            "city": "Hall Beach",
            "country": "Canada",
            "iata": "YUX",
            "airport": "Hall Beach Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Halmstad, Sweden (HAD)",
            "city": "Halmstad",
            "country": "Sweden",
            "iata": "HAD",
            "airport": "Halmstad Airport"
          },
          {
            "label": "Hamilton Island, Australia (HTI)",
            "city": "Hamilton Island",
            "country": "Australia",
            "iata": "HTI",
            "airport": "Hamilton Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Hamilton, Canada (YHM)",
            "city": "Hamilton",
            "country": "Canada",
            "iata": "YHM",
            "airport": "John C. Munro Hamilton International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Hamilton, New Zealand (HLZ)",
            "city": "Hamilton",
            "country": "New Zealand",
            "iata": "HLZ",
            "airport": "Hamilton International Airport"
          },
          {
            "label": "Hammerfest, Norway (HFT)",
            "city": "Hammerfest",
            "country": "Norway",
            "iata": "HFT",
            "airport": "Hammerfest Airport"
          },
          {
            "label": "Hampton, US (PHF)",
            "city": "Hampton",
            "country": "US",
            "iata": "PHF",
            "airport": "Newport News Williamsburg International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Hana, US (HNM)",
            "city": "Hana",
            "country": "US",
            "iata": "HNM",
            "airport": "Hana Airport",
            "currency_code": "USD"
          },
          {
            "label": "Hanamaki, Japan (HNA)",
            "city": "Hanamaki",
            "country": "Japan",
            "iata": "HNA",
            "airport": "Hanamaki Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Hancock, US (CMX)",
            "city": "Hancock",
            "country": "US",
            "iata": "CMX",
            "airport": "Houghton County Memorial Airport",
            "currency_code": "USD"
          },
          {
            "label": "Hanimaadhoo, Maldives (HAQ)",
            "city": "Hanimaadhoo",
            "country": "Maldives",
            "iata": "HAQ",
            "airport": "Hanimaadhoo Airport"
          },
          {
            "label": "Hanover, US (LEB)",
            "city": "Hanover",
            "country": "US",
            "iata": "LEB",
            "airport": "Lebanon Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Hanzhong, China (HZG)",
            "city": "Hanzhong",
            "country": "China",
            "iata": "HZG",
            "airport": "Hanzhong Airport"
          },
          {
            "label": "Harare, Zimbabwe (HRE)",
            "city": "Harare",
            "country": "Zimbabwe",
            "iata": "HRE",
            "airport": "Harare International Airport"
          },
          {
            "label": "Harbin, China (HRB)",
            "city": "Harbin",
            "country": "China",
            "iata": "HRB",
            "airport": "Taiping Airport"
          },
          {
            "label": "Harlingen, US (HRL)",
            "city": "Harlingen",
            "country": "US",
            "iata": "HRL",
            "airport": "Valley International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Harrisburg, US (MDT)",
            "city": "Harrisburg",
            "country": "US",
            "iata": "MDT",
            "airport": "Harrisburg International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Harrison, US (HRO)",
            "city": "Harrison",
            "country": "US",
            "iata": "HRO",
            "airport": "Boone County Airport",
            "currency_code": "USD"
          },
          {
            "label": "Harrogate, UK (HRT)",
            "city": "Harrogate",
            "country": "UK",
            "iata": "HRT",
            "airport": "RAF Linton-On-Ouse",
            "currency_code": "GBP"
          },
          {
            "label": "Harstad-Narvik, Norway (EVE)",
            "city": "Harstad-Narvik",
            "country": "Norway",
            "iata": "EVE",
            "airport": "Harstad/Narvik Airport, Evenes"
          },
          {
            "label": "Hassleholm, Sweden (XWP)",
            "city": "Hassleholm",
            "country": "Sweden",
            "iata": "XWP",
            "airport": ""
          },
          {
            "label": "Hasvik, Norway (HAA)",
            "city": "Hasvik",
            "country": "Norway",
            "iata": "HAA",
            "airport": "Hasvik Airport"
          },
          {
            "label": "Hat Yai, Thailand (HDY)",
            "city": "Hat Yai",
            "country": "Thailand",
            "iata": "HDY",
            "airport": "Hat Yai International Airport",
            "currency_code": "THB"
          },
          {
            "label": "Hatanga, Russia (HTG)",
            "city": "Hatanga",
            "country": "Russia",
            "iata": "HTG",
            "airport": "Khatanga Airport"
          },
          {
            "label": "Haugesund, Norway (HAU)",
            "city": "Haugesund",
            "country": "Norway",
            "iata": "HAU",
            "airport": "Haugesund Airport"
          },
          {
            "label": "Havre St Pierre, Canada (YGV)",
            "city": "Havre St Pierre",
            "country": "Canada",
            "iata": "YGV",
            "airport": "Havre St Pierre Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Hay River, Canada (YHY)",
            "city": "Hay River",
            "country": "Canada",
            "iata": "YHY",
            "airport": "Hay River / Merlyn Carter Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Hayman Island, Australia (HIS)",
            "city": "Hayman Island",
            "country": "Australia",
            "iata": "HIS",
            "airport": "Hayman Island Resort Seaplane Base",
            "currency_code": "AUD"
          },
          {
            "label": "Hefei, China (HFE)",
            "city": "Hefei",
            "country": "China",
            "iata": "HFE",
            "airport": "Hefei Luogang International Airport"
          },
          {
            "label": "Heihe, China (HEK)",
            "city": "Heihe",
            "country": "China",
            "iata": "HEK",
            "airport": "Heihe Airport"
          },
          {
            "label": "Helena, US (HLN)",
            "city": "Helena",
            "country": "US",
            "iata": "HLN",
            "airport": "Helena Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Helgoland, Germany (HGL)",
            "city": "Helgoland",
            "country": "Germany",
            "iata": "HGL",
            "airport": ""
          },
          {
            "label": "Hemavan, Sweden (HMV)",
            "city": "Hemavan",
            "country": "Sweden",
            "iata": "HMV",
            "airport": "Hemavan Airport"
          },
          {
            "label": "Hengchun, Taiwan (HCN)",
            "city": "Hengchun",
            "country": "Taiwan",
            "iata": "HCN",
            "airport": "Hengchun Airport"
          },
          {
            "label": "Heraklion, Greece (HER)",
            "city": "Heraklion",
            "country": "Greece",
            "iata": "HER",
            "airport": "Heraklion International Nikos Kazantzakis Airport"
          },
          {
            "label": "Herat, Afghanistan (HEA)",
            "city": "Herat",
            "country": "Afghanistan",
            "iata": "HEA",
            "airport": "Herat Airport",
            "currency_code": "AFN"
          },
          {
            "label": "Heringsdorf, Germany (HDF)",
            "city": "Heringsdorf",
            "country": "Germany",
            "iata": "HDF",
            "airport": "Heringsdorf Airport"
          },
          {
            "label": "Hermosillo, Mexico (HMO)",
            "city": "Hermosillo",
            "country": "Mexico",
            "iata": "HMO",
            "airport": "General Ignacio P. Garcia International Airport"
          },
          {
            "label": "Hervey Bay, Australia (HVB)",
            "city": "Hervey Bay",
            "country": "Australia",
            "iata": "HVB",
            "airport": "Hervey Bay Airport",
            "currency_code": "AUD"
          },
          {
            "label": "High Level, Canada (YOJ)",
            "city": "High Level",
            "country": "Canada",
            "iata": "YOJ",
            "airport": "High Level Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Hilo - Hawaii, US (ITO)",
            "city": "Hilo",
            "country": "US",
            "iata": "ITO",
            "airport": "Hilo International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Hiroshima, Japan (HIJ)",
            "city": "Hiroshima",
            "country": "Japan",
            "iata": "HIJ",
            "airport": "Hiroshima Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Hobart, Australia (HBA)",
            "city": "Hobart",
            "country": "Australia",
            "iata": "HBA",
            "airport": "Hobart International Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Hodeidah, Yemen (HOD)",
            "city": "Hodeidah",
            "country": "Yemen",
            "iata": "HOD",
            "airport": "Hodeidah International Airport"
          },
          {
            "label": "Hoedspruit, South Africa (HDS)",
            "city": "Hoedspruit",
            "country": "South Africa",
            "iata": "HDS",
            "airport": "Hoedspruit Air Force Base Airport"
          },
          {
            "label": "Hof, Germany (HOQ)",
            "city": "Hof",
            "country": "Germany",
            "iata": "HOQ",
            "airport": "Hof-Plauen Airport"
          },
          {
            "label": "Hohhot, China (HET)",
            "city": "Hohhot",
            "country": "China",
            "iata": "HET",
            "airport": "Baita International Airport"
          },
          {
            "label": "Hokitika, New Zealand (HKK)",
            "city": "Hokitika",
            "country": "New Zealand",
            "iata": "HKK",
            "airport": "Hokitika Airfield"
          },
          {
            "label": "Holman, Canada (YHI)",
            "city": "Holman",
            "country": "Canada",
            "iata": "YHI",
            "airport": "Ulukhaktok Holman Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Holy Cross, US (HCR)",
            "city": "Holy Cross",
            "country": "US",
            "iata": "HCR",
            "airport": "Holy Cross Airport",
            "currency_code": "USD"
          },
          {
            "label": "Holyhead, UK (HLY)",
            "city": "Holyhead",
            "country": "UK",
            "iata": "HLY",
            "airport": "Anglesey Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Homer, US (HOM)",
            "city": "Homer",
            "country": "US",
            "iata": "HOM",
            "airport": "Homer Airport",
            "currency_code": "USD"
          },
          {
            "label": "Honiara, Solomon Islands (HIR)",
            "city": "Honiara",
            "country": "Solomon Islands",
            "iata": "HIR",
            "airport": "Honiara International Airport"
          },
          {
            "label": "Honningsvag, Norway (HVG)",
            "city": "Honningsvag",
            "country": "Norway",
            "iata": "HVG",
            "airport": "Valan Airport"
          },
          {
            "label": "Hoolehua, US (MKK)",
            "city": "Hoolehua",
            "country": "US",
            "iata": "MKK",
            "airport": "Molokai Airport",
            "currency_code": "USD"
          },
          {
            "label": "Hoonah, US (HNH)",
            "city": "Hoonah",
            "country": "US",
            "iata": "HNH",
            "airport": "Hoonah Airport",
            "currency_code": "USD"
          },
          {
            "label": "Hooper Bay, US (HPB)",
            "city": "Hooper Bay",
            "country": "US",
            "iata": "HPB",
            "airport": "Hooper Bay Airport",
            "currency_code": "USD"
          },
          {
            "label": "Hopedale, Canada (YHO)",
            "city": "Hopedale",
            "country": "Canada",
            "iata": "YHO",
            "airport": "Hopedale Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Horn Island, Australia (HID)",
            "city": "Horn Island",
            "country": "Australia",
            "iata": "HID",
            "airport": "Horn Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Horta, Portugal (HOR)",
            "city": "Horta",
            "country": "Portugal",
            "iata": "HOR",
            "airport": "Horta Airport"
          },
          {
            "label": "Hoskins, Papua New Guinea (HKN)",
            "city": "Hoskins",
            "country": "Papua New Guinea",
            "iata": "HKN",
            "airport": "Kimbe Airport"
          },
          {
            "label": "Hot Springs, US (HOT)",
            "city": "Hot Springs",
            "country": "US",
            "iata": "HOT",
            "airport": "Memorial Field",
            "currency_code": "USD"
          },
          {
            "label": "Hotan, China (HTN)",
            "city": "Hotan",
            "country": "China",
            "iata": "HTN",
            "airport": "Hotan Airport"
          },
          {
            "label": "Hua Hin, Thailand (HHQ)",
            "city": "Hua Hin",
            "country": "Thailand",
            "iata": "HHQ",
            "airport": "Hua Hin Airport",
            "currency_code": "THB"
          },
          {
            "label": "Hua lien, Taiwan (HUN)",
            "city": "Hua lien",
            "country": "Taiwan",
            "iata": "HUN",
            "airport": "Hualien Airport"
          },
          {
            "label": "Huangyan, China (HYN)",
            "city": "Huangyan",
            "country": "China",
            "iata": "HYN",
            "airport": "Huangyan Luqiao Airport"
          },
          {
            "label": "Huatulco, Mexico (HUX)",
            "city": "Huatulco",
            "country": "Mexico",
            "iata": "HUX",
            "airport": ""
          },
          {
            "label": "Hudiksvall, Sweden (HUV)",
            "city": "Hudiksvall",
            "country": "Sweden",
            "iata": "HUV",
            "airport": "Hudiksvall Airport"
          },
          {
            "label": "Hue, Vietnam (HUI)",
            "city": "Hue",
            "country": "Vietnam",
            "iata": "HUI",
            "airport": "Phu Bai Airport"
          },
          {
            "label": "Hughenden, Australia (HGD)",
            "city": "Hughenden",
            "country": "Australia",
            "iata": "HGD",
            "airport": "Hughenden Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Humberside, UK (HUY)",
            "city": "Humberside",
            "country": "UK",
            "iata": "HUY",
            "airport": "Humberside Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Huntington/Ashland, US (HTS)",
            "city": "Huntington/Ashland",
            "country": "US",
            "iata": "HTS",
            "airport": "Tri-State/Milton J. Ferguson Field",
            "currency_code": "USD"
          },
          {
            "label": "Huntsville, US (HSV)",
            "city": "Huntsville",
            "country": "US",
            "iata": "HSV",
            "airport": "Huntsville International Carl T Jones Field",
            "currency_code": "USD"
          },
          {
            "label": "Hurghada, Egypt (HRG)",
            "city": "Hurghada",
            "country": "Egypt",
            "iata": "HRG",
            "airport": "Hurghada International Airport"
          },
          {
            "label": "Huron, US (HON)",
            "city": "Huron",
            "country": "US",
            "iata": "HON",
            "airport": "Huron Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Hyannis, US (HYA)",
            "city": "Hyannis",
            "country": "US",
            "iata": "HYA",
            "airport": "Barnstable Municipal Boardman Polando Field",
            "currency_code": "USD"
          },
          {
            "label": "Hydaburg, US (HYG)",
            "city": "Hydaburg",
            "country": "US",
            "iata": "HYG",
            "airport": "Hydaburg Seaplane Base",
            "currency_code": "USD"
          },
          {
            "label": "Iasi, Romania (IAS)",
            "city": "Iasi",
            "country": "Romania",
            "iata": "IAS",
            "airport": "Iasi Airport",
            "currency_code": "RON"
          },
          {
            "label": "Ibague, Colombia (IBE)",
            "city": "Ibague",
            "country": "Colombia",
            "iata": "IBE",
            "airport": "Perales Airport",
            "currency_code": "COP"
          },
          {
            "label": "Ibiza, Spain (IBZ)",
            "city": "Ibiza",
            "country": "Spain",
            "iata": "IBZ",
            "airport": "Ibiza Airport"
          },
          {
            "label": "Idaho Falls, US (IDA)",
            "city": "Idaho Falls",
            "country": "US",
            "iata": "IDA",
            "airport": "Idaho Falls Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Igarka, Russia (IAA)",
            "city": "Igarka",
            "country": "Russia",
            "iata": "IAA",
            "airport": "Igarka Airport"
          },
          {
            "label": "Igiugig, US (IGG)",
            "city": "Igiugig",
            "country": "US",
            "iata": "IGG",
            "airport": "Igiugig Airport",
            "currency_code": "USD"
          },
          {
            "label": "Igloolik, Canada (YGT)",
            "city": "Igloolik",
            "country": "Canada",
            "iata": "YGT",
            "airport": "Igloolik Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Iguassu Falls, Brazil (IGU)",
            "city": "Iguassu Falls",
            "country": "Brazil",
            "iata": "IGU",
            "airport": "Cataratas International Airport"
          },
          {
            "label": "Iguazu, Argentina (IGR)",
            "city": "Iguazu",
            "country": "Argentina",
            "iata": "IGR",
            "airport": "",
            "currency_code": "ARS"
          },
          {
            "label": "Ikaria Island, Greece (JIK)",
            "city": "Ikaria Island",
            "country": "Greece",
            "iata": "JIK",
            "airport": "Ikaria Airport"
          },
          {
            "label": "Ile Des Pins, New Caledonia (ILP)",
            "city": "Ile Des Pins",
            "country": "New Caledonia",
            "iata": "ILP",
            "airport": ""
          },
          {
            "label": "Iles De La Madeleine, Canada (YGR)",
            "city": "Iles De La Madeleine",
            "country": "Canada",
            "iata": "YGR",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "IlhÃƒÂ©us, Brazil (IOS)",
            "city": "IlhÃƒÂ©us",
            "country": "Brazil",
            "iata": "IOS",
            "airport": "Bahia - Jorge Amado Airport"
          },
          {
            "label": "Iliamna, US (ILI)",
            "city": "Iliamna",
            "country": "US",
            "iata": "ILI",
            "airport": "Iliamna Airport",
            "currency_code": "USD"
          },
          {
            "label": "Iloilo, Philippines (ILO)",
            "city": "Iloilo",
            "country": "Philippines",
            "iata": "ILO",
            "airport": "Iloilo International Airport"
          },
          {
            "label": "Ilulissat, Greenland (JAV)",
            "city": "Ilulissat",
            "country": "Greenland",
            "iata": "JAV",
            "airport": "Ilulissat Airport"
          },
          {
            "label": "Imperatriz, Brazil (IMP)",
            "city": "Imperatriz",
            "country": "Brazil",
            "iata": "IMP",
            "airport": "Prefeito Renato Moreira Airport"
          },
          {
            "label": "Indaselassie, Ethiopia (SHC)",
            "city": "Indaselassie",
            "country": "Ethiopia",
            "iata": "SHC",
            "airport": "Shire Inda Selassie Airport"
          },
          {
            "label": "Inhambane, Mozambique (INH)",
            "city": "Inhambane",
            "country": "Mozambique",
            "iata": "INH",
            "airport": "Inhambane Airport"
          },
          {
            "label": "Innsbruck, Austria (INN)",
            "city": "Innsbruck",
            "country": "Austria",
            "iata": "INN",
            "airport": "Innarsuit Heliport"
          },
          {
            "label": "International Falls, US (INL)",
            "city": "International Falls",
            "country": "US",
            "iata": "INL",
            "airport": "Falls International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Inukjuak, Canada (YPH)",
            "city": "Inukjuak",
            "country": "Canada",
            "iata": "YPH",
            "airport": "Inukjuak Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Inuvik, Canada (YEV)",
            "city": "Inuvik",
            "country": "Canada",
            "iata": "YEV",
            "airport": "Inuvik Mike Zubko Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Invercargill, New Zealand (IVC)",
            "city": "Invercargill",
            "country": "New Zealand",
            "iata": "IVC",
            "airport": "Invercargill Airport"
          },
          {
            "label": "Inverell, Australia (IVR)",
            "city": "Inverell",
            "country": "Australia",
            "iata": "IVR",
            "airport": "Inverell Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Inverness, UK (INV)",
            "city": "Inverness",
            "country": "UK",
            "iata": "INV",
            "airport": "Inverness Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Ioannina, Greece (IOA)",
            "city": "Ioannina",
            "country": "Greece",
            "iata": "IOA",
            "airport": "Ioannina Airport"
          },
          {
            "label": "Ipatinga, Brazil (IPN)",
            "city": "Ipatinga",
            "country": "Brazil",
            "iata": "IPN",
            "airport": "Usiminas Airport"
          },
          {
            "label": "Ipiales, Colombia (IPI)",
            "city": "Ipiales",
            "country": "Colombia",
            "iata": "IPI",
            "airport": "San Luis Airport",
            "currency_code": "COP"
          },
          {
            "label": "Ipoh, Malaysia (IPH)",
            "city": "Ipoh",
            "country": "Malaysia",
            "iata": "IPH",
            "airport": "Sultan Azlan Shah Airport"
          },
          {
            "label": "Ipota, Vanuatu (IPA)",
            "city": "Ipota",
            "country": "Vanuatu",
            "iata": "IPA",
            "airport": "Ipota Airport"
          },
          {
            "label": "Iqaluit, Canada (YFB)",
            "city": "Iqaluit",
            "country": "Canada",
            "iata": "YFB",
            "airport": "Iqaluit Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Iquique, Chile (IQQ)",
            "city": "Iquique",
            "country": "Chile",
            "iata": "IQQ",
            "airport": "Diego Aracena Airport"
          },
          {
            "label": "Iquitos, Peru (IQT)",
            "city": "Iquitos",
            "country": "Peru",
            "iata": "IQT",
            "airport": "Coronel FAP Francisco Secada Vignetta International Airport"
          },
          {
            "label": "Irkutsk, Russia (IKT)",
            "city": "Irkutsk",
            "country": "Russia",
            "iata": "IKT",
            "airport": "Irkutsk Airport"
          },
          {
            "label": "Isafjordur, Iceland (IFJ)",
            "city": "Isafjordur",
            "country": "Iceland",
            "iata": "IFJ",
            "airport": "",
            "currency_code": "ISK"
          },
          {
            "label": "Ishigaki, Japan (ISG)",
            "city": "Ishigaki",
            "country": "Japan",
            "iata": "ISG",
            "airport": "Isa Giron Heliport",
            "currency_code": "JPY"
          },
          {
            "label": "Island Lk, Canada (YIV)",
            "city": "Island Lk",
            "country": "Canada",
            "iata": "YIV",
            "airport": "Island Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Islay, UK (ILY)",
            "city": "Islay",
            "country": "UK",
            "iata": "ILY",
            "airport": "Islay Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Isle Of Man, UK (IOM)",
            "city": "Isle Of Man",
            "country": "UK",
            "iata": "IOM",
            "airport": "Isle of Man Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Islip, US (ISP)",
            "city": "Islip",
            "country": "US",
            "iata": "ISP",
            "airport": "Long Island Mac Arthur Airport",
            "currency_code": "USD"
          },
          {
            "label": "Ithaca, US (ITH)",
            "city": "Ithaca",
            "country": "US",
            "iata": "ITH",
            "airport": "Ithaca Tompkins Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Ivalo, Finland (IVL)",
            "city": "Ivalo",
            "country": "Finland",
            "iata": "IVL",
            "airport": "Ivalo Airport"
          },
          {
            "label": "Ivano-Frankovsk, Ukraine (IFO)",
            "city": "Ivano-Frankovsk",
            "country": "Ukraine",
            "iata": "IFO",
            "airport": "Ivano-Frankivsk International Airport"
          },
          {
            "label": "Ivujivik, Canada (YIK)",
            "city": "Ivujivik",
            "country": "Canada",
            "iata": "YIK",
            "airport": "Ivujivik Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Iwami, Japan (IWJ)",
            "city": "Iwami",
            "country": "Japan",
            "iata": "IWJ",
            "airport": "Iwami Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Ixtapa/Zihuatanejo, Mexico (ZIH)",
            "city": "Ixtapa/Zihuatanejo",
            "country": "Mexico",
            "iata": "ZIH",
            "airport": "Ixtapa Zihuatanejo International Airport"
          },
          {
            "label": "Izmir, Turkey (ADB)",
            "city": "Izmir",
            "country": "Turkey",
            "iata": "ADB",
            "airport": "Adnan Menderes International Airport"
          },
          {
            "label": "Izumo, Japan (IZO)",
            "city": "Izumo",
            "country": "Japan",
            "iata": "IZO",
            "airport": "Izumo Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Jackson, US (JAC)",
            "city": "Jackson",
            "country": "US",
            "iata": "JAC",
            "airport": "Jackson Hole Airport",
            "currency_code": "USD"
          },
          {
            "label": "Jackson, US (JAN)",
            "city": "Jackson",
            "country": "US",
            "iata": "JAN",
            "airport": "Jackson Evers International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Jackson, US (MKL)",
            "city": "Jackson",
            "country": "US",
            "iata": "MKL",
            "airport": "Mc Kellar Sipes Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Jacksonville, US (JAX)",
            "city": "Jacksonville",
            "country": "US",
            "iata": "JAX",
            "airport": "Jacksonville International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Jacquinot Bay, Papua New Guinea (JAQ)",
            "city": "Jacquinot Bay",
            "country": "Papua New Guinea",
            "iata": "JAQ",
            "airport": "Jacquinot Bay Airport"
          },
          {
            "label": "Jalapa, Mexico (JAL)",
            "city": "Jalapa",
            "country": "Mexico",
            "iata": "JAL",
            "airport": "El Lencero Airport"
          },
          {
            "label": "Jambi, Indonesia (DJB)",
            "city": "Jambi",
            "country": "Indonesia",
            "iata": "DJB",
            "airport": "Sultan Thaha Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Jamestown, US (JMS)",
            "city": "Jamestown",
            "country": "US",
            "iata": "JMS",
            "airport": "Jamestown Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Jayapura, Indonesia (DJJ)",
            "city": "Jayapura",
            "country": "Indonesia",
            "iata": "DJJ",
            "airport": "Sentani Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Jazan, Saudi Arabia (GIZ)",
            "city": "Jazan",
            "country": "Saudi Arabia",
            "iata": "GIZ",
            "airport": "Jizan Regional Airport"
          },
          {
            "label": "Jeh, Marshall Islands (JEJ)",
            "city": "Jeh",
            "country": "Marshall Islands",
            "iata": "JEJ",
            "airport": "Jeh Airport"
          },
          {
            "label": "Jeju, South Korea (CJU)",
            "city": "Jeju",
            "country": "South Korea",
            "iata": "CJU",
            "airport": "Jeju International Airport"
          },
          {
            "label": "Jerez de la Frontera, Spain (XRY)",
            "city": "Jerez de la Frontera",
            "country": "Spain",
            "iata": "XRY",
            "airport": "Jerez Airport"
          },
          {
            "label": "Jersey, UK (JER)",
            "city": "Jersey",
            "country": "UK",
            "iata": "JER",
            "airport": "Jersey Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Jessore, Bangladesh (JSR)",
            "city": "Jessore",
            "country": "Bangladesh",
            "iata": "JSR",
            "airport": "Jessore Airport",
            "currency_code": "BDT"
          },
          {
            "label": "Ji An, China (JGS)",
            "city": "Ji An",
            "country": "China",
            "iata": "JGS",
            "airport": "Jinggangshan Airport"
          },
          {
            "label": "Jiamusi, China (JMU)",
            "city": "Jiamusi",
            "country": "China",
            "iata": "JMU",
            "airport": "Jiamusi Airport"
          },
          {
            "label": "Jinan, China (TNA)",
            "city": "Jinan",
            "country": "China",
            "iata": "TNA",
            "airport": "Yaoqiang Airport"
          },
          {
            "label": "Jingdezhen, China (JDZ)",
            "city": "Jingdezhen",
            "country": "China",
            "iata": "JDZ",
            "airport": "Jingdezhen Airport"
          },
          {
            "label": "Jinghong, China (JHG)",
            "city": "Jinghong",
            "country": "China",
            "iata": "JHG",
            "airport": "Xishuangbanna Gasa Airport"
          },
          {
            "label": "Jinju, South Korea (HIN)",
            "city": "Jinju",
            "country": "South Korea",
            "iata": "HIN",
            "airport": "Sacheon Air Base"
          },
          {
            "label": "Jinzhou, China (JNZ)",
            "city": "Jinzhou",
            "country": "China",
            "iata": "JNZ",
            "airport": "Jinzhou Airport"
          },
          {
            "label": "Ji-Parana, Brazil (JPR)",
            "city": "Ji-Parana",
            "country": "Brazil",
            "iata": "JPR",
            "airport": ""
          },
          {
            "label": "Jiujiang, China (JIU)",
            "city": "Jiujiang",
            "country": "China",
            "iata": "JIU",
            "airport": "Jiujiang Lushan Airport"
          },
          {
            "label": "Jiuquan, China (JGN)",
            "city": "Jiuquan",
            "country": "China",
            "iata": "JGN",
            "airport": "Jiayuguan Airport"
          },
          {
            "label": "Joao Pessoa, Brazil (JPA)",
            "city": "Joao Pessoa",
            "country": "Brazil",
            "iata": "JPA",
            "airport": "Presidente Castro Pinto Airport"
          },
          {
            "label": "Joensuu, Finland (JOE)",
            "city": "Joensuu",
            "country": "Finland",
            "iata": "JOE",
            "airport": "Joensuu Airport"
          },
          {
            "label": "Johnstown, US (JST)",
            "city": "Johnstown",
            "country": "US",
            "iata": "JST",
            "airport": "John Murtha Johnstown Cambria County Airport",
            "currency_code": "USD"
          },
          {
            "label": "Johor Bahru, Malaysia (JHB)",
            "city": "Johor Bahru",
            "country": "Malaysia",
            "iata": "JHB",
            "airport": "Senai International Airport"
          },
          {
            "label": "Joinville, Brazil (JOI)",
            "city": "Joinville",
            "country": "Brazil",
            "iata": "JOI",
            "airport": "Lauro Carneiro de Loyola Airport"
          },
          {
            "label": "Jolo, Philippines (JOL)",
            "city": "Jolo",
            "country": "Philippines",
            "iata": "JOL",
            "airport": "Jolo Airport"
          },
          {
            "label": "Jonesboro, US (JBR)",
            "city": "Jonesboro",
            "country": "US",
            "iata": "JBR",
            "airport": "Jonesboro Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Jonkoping, Sweden (JKG)",
            "city": "Jonkoping",
            "country": "Sweden",
            "iata": "JKG",
            "airport": ""
          },
          {
            "label": "Joplin, US (JLN)",
            "city": "Joplin",
            "country": "US",
            "iata": "JLN",
            "airport": "Joplin Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Jouf, Saudi Arabia (AJF)",
            "city": "Jouf",
            "country": "Saudi Arabia",
            "iata": "AJF",
            "airport": "Al-Jawf Domestic Airport"
          },
          {
            "label": "Juazeiro Do Norte, Brazil (JDO)",
            "city": "Juazeiro Do Norte",
            "country": "Brazil",
            "iata": "JDO",
            "airport": "Orlando Bezerra de Menezes Airport"
          },
          {
            "label": "Juiz De Fora, Brazil (JDF)",
            "city": "Juiz De Fora",
            "country": "Brazil",
            "iata": "JDF",
            "airport": "Francisco de Assis Airport"
          },
          {
            "label": "Jujuy, Argentina (JUJ)",
            "city": "Jujuy",
            "country": "Argentina",
            "iata": "JUJ",
            "airport": "Gobernador Horacio Guzman International Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Julia Creek, Australia (JCK)",
            "city": "Julia Creek",
            "country": "Australia",
            "iata": "JCK",
            "airport": "Julia Creek Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Juliaca, Peru (JUL)",
            "city": "Juliaca",
            "country": "Peru",
            "iata": "JUL",
            "airport": "Inca Manco Capac International Airport"
          },
          {
            "label": "Jumla, Nepal (JUM)",
            "city": "Jumla",
            "country": "Nepal",
            "iata": "JUM",
            "airport": "Jumla Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Juneau, US (JNU)",
            "city": "Juneau",
            "country": "US",
            "iata": "JNU",
            "airport": "Juneau International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Juzhou, China (JUZ)",
            "city": "Juzhou",
            "country": "China",
            "iata": "JUZ",
            "airport": "Quzhou Airport"
          },
          {
            "label": "Jyvaskyla, Finland (JYV)",
            "city": "Jyvaskyla",
            "country": "Finland",
            "iata": "JYV",
            "airport": "Jyvaskyla Airport"
          },
          {
            "label": "Kaadedhdhoo, Maldives (KDM)",
            "city": "Kaadedhdhoo",
            "country": "Maldives",
            "iata": "KDM",
            "airport": "Kaadedhdhoo Airport"
          },
          {
            "label": "Kabri Dar, Ethiopia (ABK)",
            "city": "Kabri Dar",
            "country": "Ethiopia",
            "iata": "ABK",
            "airport": "Kabri Dehar Airport"
          },
          {
            "label": "Kadhdhoo, Maldives (KDO)",
            "city": "Kadhdhoo",
            "country": "Maldives",
            "iata": "KDO",
            "airport": "Kadhdhoo Airport"
          },
          {
            "label": "Kagau, Solomon Islands (KGE)",
            "city": "Kagau",
            "country": "Solomon Islands",
            "iata": "KGE",
            "airport": "Kagau Island Airport"
          },
          {
            "label": "Kagoshima, Japan (KOJ)",
            "city": "Kagoshima",
            "country": "Japan",
            "iata": "KOJ",
            "airport": "Kagoshima Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Kahramanmaras, Turkey (KCM)",
            "city": "Kahramanmaras",
            "country": "Turkey",
            "iata": "KCM",
            "airport": "Kahramanmaras Airport"
          },
          {
            "label": "Kahului, US (OGG)",
            "city": "Kahului",
            "country": "US",
            "iata": "OGG",
            "airport": "Kahului Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kaimana, Indonesia (KNG)",
            "city": "Kaimana",
            "country": "Indonesia",
            "iata": "KNG",
            "airport": "Kaimana Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Kaitaia, New Zealand (KAT)",
            "city": "Kaitaia",
            "country": "New Zealand",
            "iata": "KAT",
            "airport": "Kaitaia Airport"
          },
          {
            "label": "Kajaani, Finland (KAJ)",
            "city": "Kajaani",
            "country": "Finland",
            "iata": "KAJ",
            "airport": "Kajaani Airport"
          },
          {
            "label": "Kake, US (KAE)",
            "city": "Kake",
            "country": "US",
            "iata": "KAE",
            "airport": "Kake Seaplane Base",
            "currency_code": "USD"
          },
          {
            "label": "Kalamata, Greece (KLX)",
            "city": "Kalamata",
            "country": "Greece",
            "iata": "KLX",
            "airport": "Kalamata Airport"
          },
          {
            "label": "Kalamazoo, US (AZO)",
            "city": "Kalamazoo",
            "country": "US",
            "iata": "AZO",
            "airport": "Kalamazoo Battle Creek International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kalaupapa, US (LUP)",
            "city": "Kalaupapa",
            "country": "US",
            "iata": "LUP",
            "airport": "Kalaupapa Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kalbarri, Australia (KAX)",
            "city": "Kalbarri",
            "country": "Australia",
            "iata": "KAX",
            "airport": "Kalbarri Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Kalgoorlie, Australia (KGI)",
            "city": "Kalgoorlie",
            "country": "Australia",
            "iata": "KGI",
            "airport": "Kalgoorlie Boulder Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Kalibo, Philippines (KLO)",
            "city": "Kalibo",
            "country": "Philippines",
            "iata": "KLO",
            "airport": "Kalibo International Airport"
          },
          {
            "label": "Kaliningrad, Russia (KGD)",
            "city": "Kaliningrad",
            "country": "Russia",
            "iata": "KGD",
            "airport": "Khrabrovo Airport"
          },
          {
            "label": "Kalispell, US (FCA)",
            "city": "Kalispell",
            "country": "US",
            "iata": "FCA",
            "airport": "Glacier Park International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kalmar, Sweden (KLR)",
            "city": "Kalmar",
            "country": "Sweden",
            "iata": "KLR",
            "airport": "Kalmar Airport"
          },
          {
            "label": "Kalskag, US (KLG)",
            "city": "Kalskag",
            "country": "US",
            "iata": "KLG",
            "airport": "Kalskag Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kaltag, US (KAL)",
            "city": "Kaltag",
            "country": "US",
            "iata": "KAL",
            "airport": "Kaltag Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kamloops, Canada (YKA)",
            "city": "Kamloops",
            "country": "Canada",
            "iata": "YKA",
            "airport": "Kamloops Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kamuela, US (MUE)",
            "city": "Kamuela",
            "country": "US",
            "iata": "MUE",
            "airport": "Waimea Kohala Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kananga, Democratic Republic of the Congo (KGA)",
            "city": "Kananga",
            "country": "Democratic Republic of the Congo",
            "iata": "KGA",
            "airport": "Kananga Airport"
          },
          {
            "label": "Kandavu, Fiji (KDV)",
            "city": "Kandavu",
            "country": "Fiji",
            "iata": "KDV",
            "airport": "Vunisea Airport"
          },
          {
            "label": "Kandrian, Papua New Guinea (KDR)",
            "city": "Kandrian",
            "country": "Papua New Guinea",
            "iata": "KDR",
            "airport": "Kandrian Airport"
          },
          {
            "label": "Kangerlussuaq, Greenland (SFJ)",
            "city": "Kangerlussuaq",
            "country": "Greenland",
            "iata": "SFJ",
            "airport": "Kangerlussuaq Airport"
          },
          {
            "label": "Kangiqsualujjuaq, Canada (XGR)",
            "city": "Kangiqsualujjuaq",
            "country": "Canada",
            "iata": "XGR",
            "airport": "Kangiqsualujjuaq (Georges River) Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kangirsuk, Canada (YKG)",
            "city": "Kangirsuk",
            "country": "Canada",
            "iata": "YKG",
            "airport": "Kangirsuk Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kansas City, US (MCI)",
            "city": "Kansas City",
            "country": "US",
            "iata": "MCI",
            "airport": "Kansas City International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kaohsiung, Taiwan (KHH)",
            "city": "Kaohsiung",
            "country": "Taiwan",
            "iata": "KHH",
            "airport": "Kaohsiung International Airport"
          },
          {
            "label": "Kapalua, US (JHM)",
            "city": "Kapalua",
            "country": "US",
            "iata": "JHM",
            "airport": "Kapalua Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kapuskasing, Canada (YYU)",
            "city": "Kapuskasing",
            "country": "Canada",
            "iata": "YYU",
            "airport": "Kapuskasing Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Karaganda, Kazakhstan (KGF)",
            "city": "Karaganda",
            "country": "Kazakhstan",
            "iata": "KGF",
            "airport": "Sary-Arka Airport"
          },
          {
            "label": "Karamay, China (KRY)",
            "city": "Karamay",
            "country": "China",
            "iata": "KRY",
            "airport": "Karamay Airport"
          },
          {
            "label": "Kardla, Estonia (KDL)",
            "city": "Kardla",
            "country": "Estonia",
            "iata": "KDL",
            "airport": ""
          },
          {
            "label": "Kariba, Zimbabwe (KAB)",
            "city": "Kariba",
            "country": "Zimbabwe",
            "iata": "KAB",
            "airport": "Kariba International Airport"
          },
          {
            "label": "Karlovy Vary, Czech Republic (KLV)",
            "city": "Karlovy Vary",
            "country": "Czech Republic",
            "iata": "KLV",
            "airport": "Karlovy Vary International Airport"
          },
          {
            "label": "Karlsruhe/Baden Baden, Germany (FKB)",
            "city": "Karlsruhe/Baden Baden",
            "country": "Germany",
            "iata": "FKB",
            "airport": "Karlsruhe Baden-Baden Airport"
          },
          {
            "label": "Karlstad, Sweden (KSD)",
            "city": "Karlstad",
            "country": "Sweden",
            "iata": "KSD",
            "airport": "Karlstad Airport"
          },
          {
            "label": "Karpathos, Greece (AOK)",
            "city": "Karpathos",
            "country": "Greece",
            "iata": "AOK",
            "airport": "Karpathos Airport"
          },
          {
            "label": "Karratha, Australia (KTA)",
            "city": "Karratha",
            "country": "Australia",
            "iata": "KTA",
            "airport": "Karratha Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Kars, Turkey (KSY)",
            "city": "Kars",
            "country": "Turkey",
            "iata": "KSY",
            "airport": "Kars Airport"
          },
          {
            "label": "Karshi, Uzbekistan (KSQ)",
            "city": "Karshi",
            "country": "Uzbekistan",
            "iata": "KSQ",
            "airport": "Karshi Khanabad Airport"
          },
          {
            "label": "Karumba, Australia (KRB)",
            "city": "Karumba",
            "country": "Australia",
            "iata": "KRB",
            "airport": "Karumba Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Karup, Denmark (KRP)",
            "city": "Karup",
            "country": "Denmark",
            "iata": "KRP",
            "airport": "Karup Airport"
          },
          {
            "label": "Kasabonika, Canada (XKS)",
            "city": "Kasabonika",
            "country": "Canada",
            "iata": "XKS",
            "airport": "Kasabonika Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kaschechewan, Canada (ZKE)",
            "city": "Kaschechewan",
            "country": "Canada",
            "iata": "ZKE",
            "airport": "Kashechewan Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kashi, China (KHG)",
            "city": "Kashi",
            "country": "China",
            "iata": "KHG",
            "airport": "Kashgar Airport"
          },
          {
            "label": "Kasos Island, Greece (KSJ)",
            "city": "Kasos Island",
            "country": "Greece",
            "iata": "KSJ",
            "airport": "Kasos Airport"
          },
          {
            "label": "Kassel, Germany (KSF)",
            "city": "Kassel",
            "country": "Germany",
            "iata": "KSF",
            "airport": "Kassel-Calden Airport"
          },
          {
            "label": "Kastelorizo, Greece (KZS)",
            "city": "Kastelorizo",
            "country": "Greece",
            "iata": "KZS",
            "airport": "Kastelorizo Airport"
          },
          {
            "label": "Kastoria, Greece (KSO)",
            "city": "Kastoria",
            "country": "Greece",
            "iata": "KSO",
            "airport": "Kastoria National Airport"
          },
          {
            "label": "Katherine, Australia (KTR)",
            "city": "Katherine",
            "country": "Australia",
            "iata": "KTR",
            "airport": "Tindal Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Katowice, Poland (KTW)",
            "city": "Katowice",
            "country": "Poland",
            "iata": "KTW",
            "airport": "Katowice International Airport"
          },
          {
            "label": "Kauai Island, US (LIH)",
            "city": "Kauai Island",
            "country": "US",
            "iata": "LIH",
            "airport": "Lihue Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kavala, Greece (KVA)",
            "city": "Kavala",
            "country": "Greece",
            "iata": "KVA",
            "airport": "Alexander the Great International Airport"
          },
          {
            "label": "Kavieng, Papua New Guinea (KVG)",
            "city": "Kavieng",
            "country": "Papua New Guinea",
            "iata": "KVG",
            "airport": "Kavieng Airport"
          },
          {
            "label": "Kayes, Mali (KYS)",
            "city": "Kayes",
            "country": "Mali",
            "iata": "KYS",
            "airport": "Kayes Dag Dag Airport"
          },
          {
            "label": "Kayseri, Turkey (ASR)",
            "city": "Kayseri",
            "country": "Turkey",
            "iata": "ASR",
            "airport": "Kayseri Erkilet Airport"
          },
          {
            "label": "Kazan, Russia (KZN)",
            "city": "Kazan",
            "country": "Russia",
            "iata": "KZN",
            "airport": "Kazan International Airport"
          },
          {
            "label": "Kearney, US (EAR)",
            "city": "Kearney",
            "country": "US",
            "iata": "EAR",
            "airport": "Kearney Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kefallinia, Greece (EFL)",
            "city": "Kefallinia",
            "country": "Greece",
            "iata": "EFL",
            "airport": "Kefallinia Airport"
          },
          {
            "label": "Kelowna, Canada (YLW)",
            "city": "Kelowna",
            "country": "Canada",
            "iata": "YLW",
            "airport": "Kelowna Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kemerovo, Russia (KEJ)",
            "city": "Kemerovo",
            "country": "Russia",
            "iata": "KEJ",
            "airport": "Kemerovo Airport"
          },
          {
            "label": "Kemi/Tornio, Finland (KEM)",
            "city": "Kemi/Tornio",
            "country": "Finland",
            "iata": "KEM",
            "airport": "Kemi-Tornio Airport"
          },
          {
            "label": "Kenai, US (ENA)",
            "city": "Kenai",
            "country": "US",
            "iata": "ENA",
            "airport": "Kenai Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kendari, Indonesia (KDI)",
            "city": "Kendari",
            "country": "Indonesia",
            "iata": "KDI",
            "airport": "Wolter Monginsidi Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Kenora, Canada (YQK)",
            "city": "Kenora",
            "country": "Canada",
            "iata": "YQK",
            "airport": "Kenora Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kerema, Papua New Guinea (KMA)",
            "city": "Kerema",
            "country": "Papua New Guinea",
            "iata": "KMA",
            "airport": "Kerema Airport"
          },
          {
            "label": "Kerikeri, New Zealand (KKE)",
            "city": "Kerikeri",
            "country": "New Zealand",
            "iata": "KKE",
            "airport": "Kerikeri Airport"
          },
          {
            "label": "Kerry County, Ireland (KIR)",
            "city": "Kerry County",
            "country": "Ireland",
            "iata": "KIR",
            "airport": "Kerry Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Ketchikan, US (KTN)",
            "city": "Ketchikan",
            "country": "US",
            "iata": "KTN",
            "airport": "Ketchikan International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Key West, US (EYW)",
            "city": "Key West",
            "country": "US",
            "iata": "EYW",
            "airport": "Key West International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Khabarovsk, Russia (KHV)",
            "city": "Khabarovsk",
            "country": "Russia",
            "iata": "KHV",
            "airport": "Khabarovsk-Novy Airport"
          },
          {
            "label": "Khanty-Mansiysk, Russia (HMA)",
            "city": "Khanty-Mansiysk",
            "country": "Russia",
            "iata": "HMA",
            "airport": "Khanty Mansiysk Airport"
          },
          {
            "label": "Kharkov, Ukraine (HRK)",
            "city": "Kharkov",
            "country": "Ukraine",
            "iata": "HRK",
            "airport": "Kharkiv International Airport"
          },
          {
            "label": "Khasab, Oman (KHS)",
            "city": "Khasab",
            "country": "Oman",
            "iata": "KHS",
            "airport": "Khasab Air Base"
          },
          {
            "label": "Kherson, Ukraine (KHE)",
            "city": "Kherson",
            "country": "Ukraine",
            "iata": "KHE",
            "airport": "Chernobayevka Airport"
          },
          {
            "label": "Khon Kaen, Thailand (KKC)",
            "city": "Khon Kaen",
            "country": "Thailand",
            "iata": "KKC",
            "airport": "Khon Kaen Airport",
            "currency_code": "THB"
          },
          {
            "label": "Khujand, Tajikistan (LBD)",
            "city": "Khujand",
            "country": "Tajikistan",
            "iata": "LBD",
            "airport": "Khudzhand Airport"
          },
          {
            "label": "Kiana, US (IAN)",
            "city": "Kiana",
            "country": "US",
            "iata": "IAN",
            "airport": "Bob Baker Memorial Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kikori, Papua New Guinea (KRI)",
            "city": "Kikori",
            "country": "Papua New Guinea",
            "iata": "KRI",
            "airport": "Kikori Airport"
          },
          {
            "label": "Kilimanjaro, Tanzania (JRO)",
            "city": "Kilimanjaro",
            "country": "Tanzania",
            "iata": "JRO",
            "airport": "Kilimanjaro International Airport"
          },
          {
            "label": "Killeen, US (GRK)",
            "city": "Killeen",
            "country": "US",
            "iata": "GRK",
            "airport": "Robert Gray  Army Air Field Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kimberley, South Africa (KIM)",
            "city": "Kimberley",
            "country": "South Africa",
            "iata": "KIM",
            "airport": "Kimberley Airport"
          },
          {
            "label": "Kimmirut, Canada (YLC)",
            "city": "Kimmirut",
            "country": "Canada",
            "iata": "YLC",
            "airport": "Kimmirut Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kindu, Democratic Republic of the Congo (KND)",
            "city": "Kindu",
            "country": "Democratic Republic of the Congo",
            "iata": "KND",
            "airport": "Kindu Airport"
          },
          {
            "label": "King Cove, US (KVC)",
            "city": "King Cove",
            "country": "US",
            "iata": "KVC",
            "airport": "King Cove Airport",
            "currency_code": "USD"
          },
          {
            "label": "King Island, Australia (KNS)",
            "city": "King Island",
            "country": "Australia",
            "iata": "KNS",
            "airport": "King Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "King Salmon, US (AKN)",
            "city": "King Salmon",
            "country": "US",
            "iata": "AKN",
            "airport": "King Salmon Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kingfisher Lake, Canada (KIF)",
            "city": "Kingfisher Lake",
            "country": "Canada",
            "iata": "KIF",
            "airport": "Kingfisher Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kingman, US (IGM)",
            "city": "Kingman",
            "country": "US",
            "iata": "IGM",
            "airport": "Kingman Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kingscote, Australia (KGC)",
            "city": "Kingscote",
            "country": "Australia",
            "iata": "KGC",
            "airport": "Kingscote Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Kingston, Canada (YGK)",
            "city": "Kingston",
            "country": "Canada",
            "iata": "YGK",
            "airport": "Kingston Norman Rogers Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kinmen, Taiwan (KNH)",
            "city": "Kinmen",
            "country": "Taiwan",
            "iata": "KNH",
            "airport": "Kinmen Airport"
          },
          {
            "label": "Kinshasa, Democratic Republic of the Congo (FIH)",
            "city": "Kinshasa",
            "country": "Democratic Republic of the Congo",
            "iata": "FIH",
            "airport": "Ndjili International Airport"
          },
          {
            "label": "Kinston, US (ISO)",
            "city": "Kinston",
            "country": "US",
            "iata": "ISO",
            "airport": "Isortoq Heliport",
            "currency_code": "USD"
          },
          {
            "label": "Kirakira, Solomon Islands (IRA)",
            "city": "Kirakira",
            "country": "Solomon Islands",
            "iata": "IRA",
            "airport": "Ngorangora Airport"
          },
          {
            "label": "Kirkenes, Norway (KKN)",
            "city": "Kirkenes",
            "country": "Norway",
            "iata": "KKN",
            "airport": ""
          },
          {
            "label": "Kirksville, US (IRK)",
            "city": "Kirksville",
            "country": "US",
            "iata": "IRK",
            "airport": "Kirksville Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kirkwall, UK (KOI)",
            "city": "Kirkwall",
            "country": "UK",
            "iata": "KOI",
            "airport": "Kirkwall Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Kiruna, Sweden (KRN)",
            "city": "Kiruna",
            "country": "Sweden",
            "iata": "KRN",
            "airport": "Kiruna Airport"
          },
          {
            "label": "Kisangani, Democratic Republic of the Congo (FKI)",
            "city": "Kisangani",
            "country": "Democratic Republic of the Congo",
            "iata": "FKI",
            "airport": "Bangoka International Airport"
          },
          {
            "label": "Kisumu, Kenya (KIS)",
            "city": "Kisumu",
            "country": "Kenya",
            "iata": "KIS",
            "airport": "Kisumu Airport"
          },
          {
            "label": "Kitakyushu, Japan (KKJ)",
            "city": "Kitakyushu",
            "country": "Japan",
            "iata": "KKJ",
            "airport": "Kitakyushu Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Kitchener/Waterloo, Canada (YKF)",
            "city": "Kitchener/Waterloo",
            "country": "Canada",
            "iata": "YKF",
            "airport": "Waterloo Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kithira, Greece (KIT)",
            "city": "Kithira",
            "country": "Greece",
            "iata": "KIT",
            "airport": "Kithira Airport"
          },
          {
            "label": "Kittila, Finland (KTT)",
            "city": "Kittila",
            "country": "Finland",
            "iata": "KTT",
            "airport": "Kittila Airport"
          },
          {
            "label": "Kiunga, Papua New Guinea (UNG)",
            "city": "Kiunga",
            "country": "Papua New Guinea",
            "iata": "UNG",
            "airport": "Kiunga Airport"
          },
          {
            "label": "Kivalina, US (KVL)",
            "city": "Kivalina",
            "country": "US",
            "iata": "KVL",
            "airport": "Kivalina Airport",
            "currency_code": "USD"
          },
          {
            "label": "Klagenfurt, Austria (KLU)",
            "city": "Klagenfurt",
            "country": "Austria",
            "iata": "KLU",
            "airport": "Klagenfurt Airport"
          },
          {
            "label": "Klaipeda/Palanga, Lithuania (PLQ)",
            "city": "Klaipeda/Palanga",
            "country": "Lithuania",
            "iata": "PLQ",
            "airport": "Palanga International Airport"
          },
          {
            "label": "Klamath Falls, US (LMT)",
            "city": "Klamath Falls",
            "country": "US",
            "iata": "LMT",
            "airport": "Klamath Falls Airport",
            "currency_code": "USD"
          },
          {
            "label": "Knock, Ireland (NOC)",
            "city": "Knock",
            "country": "Ireland",
            "iata": "NOC",
            "airport": "Ireland West Knock Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Knoxville, US (TYS)",
            "city": "Knoxville",
            "country": "US",
            "iata": "TYS",
            "airport": "McGhee Tyson Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kobe, Japan (UKB)",
            "city": "Kobe",
            "country": "Japan",
            "iata": "UKB",
            "airport": "Kobe Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Kodiak, US (ADQ)",
            "city": "Kodiak",
            "country": "US",
            "iata": "ADQ",
            "airport": "Kodiak Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kogalym, Russia (KGP)",
            "city": "Kogalym",
            "country": "Russia",
            "iata": "KGP",
            "airport": "Kogalym International Airport"
          },
          {
            "label": "Kokkola/Pietarsaari, Finland (KOK)",
            "city": "Kokkola/Pietarsaari",
            "country": "Finland",
            "iata": "KOK",
            "airport": "Kruunupyy Airport"
          },
          {
            "label": "Kokoda, Papua New Guinea (KKD)",
            "city": "Kokoda",
            "country": "Papua New Guinea",
            "iata": "KKD",
            "airport": "Kokoda Airport"
          },
          {
            "label": "Komatsu, Japan (KMQ)",
            "city": "Komatsu",
            "country": "Japan",
            "iata": "KMQ",
            "airport": "Komatsu Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Komsomolsk Na Amure, Russia (KXK)",
            "city": "Komsomolsk Na Amure",
            "country": "Russia",
            "iata": "KXK",
            "airport": "Komsomolsk-on-Amur Airport"
          },
          {
            "label": "Kona, US (KOA)",
            "city": "Kona",
            "country": "US",
            "iata": "KOA",
            "airport": "Kona International At Keahole Airport",
            "currency_code": "USD"
          },
          {
            "label": "Kone, New Caledonia (KNQ)",
            "city": "Kone",
            "country": "New Caledonia",
            "iata": "KNQ",
            "airport": ""
          },
          {
            "label": "Konya, Turkey (KYA)",
            "city": "Konya",
            "country": "Turkey",
            "iata": "KYA",
            "airport": "Konya Airport"
          },
          {
            "label": "Korla, China (KRL)",
            "city": "Korla",
            "country": "China",
            "iata": "KRL",
            "airport": "Korla Airport"
          },
          {
            "label": "Koro Island, Fiji (KXF)",
            "city": "Koro Island",
            "country": "Fiji",
            "iata": "KXF",
            "airport": "Koro Island Airport"
          },
          {
            "label": "Kos, Greece (KGS)",
            "city": "Kos",
            "country": "Greece",
            "iata": "KGS",
            "airport": "Kos Airport"
          },
          {
            "label": "Kosice, Slovakia (KSC)",
            "city": "Kosice",
            "country": "Slovakia",
            "iata": "KSC",
            "airport": ""
          },
          {
            "label": "Kostanai, Kazakhstan (KSN)",
            "city": "Kostanai",
            "country": "Kazakhstan",
            "iata": "KSN",
            "airport": "Kostanay West Airport"
          },
          {
            "label": "Koszalin, Poland (OSZ)",
            "city": "Koszalin",
            "country": "Poland",
            "iata": "OSZ",
            "airport": "Koszalin Zegrze Airport"
          },
          {
            "label": "Kota Bharu, Malaysia (KBR)",
            "city": "Kota Bharu",
            "country": "Malaysia",
            "iata": "KBR",
            "airport": "Sultan Ismail Petra Airport"
          },
          {
            "label": "Kota Kinabalu, Malaysia (BKI)",
            "city": "Kota Kinabalu",
            "country": "Malaysia",
            "iata": "BKI",
            "airport": "Kota Kinabalu International Airport"
          },
          {
            "label": "Kotlas, Russia (KSZ)",
            "city": "Kotlas",
            "country": "Russia",
            "iata": "KSZ",
            "airport": "Kotlas Airport"
          },
          {
            "label": "Kotzebue, US (OTZ)",
            "city": "Kotzebue",
            "country": "US",
            "iata": "OTZ",
            "airport": "Ralph Wien Memorial Airport",
            "currency_code": "USD"
          },
          {
            "label": "Koulamoutou, Gabon (KOU)",
            "city": "Koulamoutou",
            "country": "Gabon",
            "iata": "KOU",
            "airport": "Koulamoutou Airport"
          },
          {
            "label": "Koumac, New Caledonia (KOC)",
            "city": "Koumac",
            "country": "New Caledonia",
            "iata": "KOC",
            "airport": "Koumac Airport"
          },
          {
            "label": "Kowanyama, Australia (KWM)",
            "city": "Kowanyama",
            "country": "Australia",
            "iata": "KWM",
            "airport": "Kowanyama Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Kozani, Greece (KZI)",
            "city": "Kozani",
            "country": "Greece",
            "iata": "KZI",
            "airport": "Filippos Airport"
          },
          {
            "label": "Krakow, Poland (KRK)",
            "city": "Krakow",
            "country": "Poland",
            "iata": "KRK",
            "airport": ""
          },
          {
            "label": "Kramfors, Sweden (KRF)",
            "city": "Kramfors",
            "country": "Sweden",
            "iata": "KRF",
            "airport": ""
          },
          {
            "label": "Krasnodar, Russia (KRR)",
            "city": "Krasnodar",
            "country": "Russia",
            "iata": "KRR",
            "airport": "Krasnodar International Airport"
          },
          {
            "label": "Krasnojarsk, Russia (KJA)",
            "city": "Krasnojarsk",
            "country": "Russia",
            "iata": "KJA",
            "airport": "Yemelyanovo Airport"
          },
          {
            "label": "Kristiansand, Norway (KRS)",
            "city": "Kristiansand",
            "country": "Norway",
            "iata": "KRS",
            "airport": "Kristiansand Airport"
          },
          {
            "label": "Kristianstad, Sweden (KID)",
            "city": "Kristianstad",
            "country": "Sweden",
            "iata": "KID",
            "airport": "Kristianstad Airport"
          },
          {
            "label": "Kristiansund, Norway (KSU)",
            "city": "Kristiansund",
            "country": "Norway",
            "iata": "KSU",
            "airport": "Kristiansund Airport, Kvernberget"
          },
          {
            "label": "Krivoy Rog, Ukraine (KWG)",
            "city": "Krivoy Rog",
            "country": "Ukraine",
            "iata": "KWG",
            "airport": "Kryvyi Rih International Airport"
          },
          {
            "label": "Genting, Malaysia  (nearest airport Kuala Lumpur, KUL)",
            "city": "Genting",
            "country": "Malaysia",
            "iata": "KUL",
            "airport": "Kuala Lumpur International Airport"
          },
          {
            "label": "Kuala Terengganu, Malaysia (TGG)",
            "city": "Kuala Terengganu",
            "country": "Malaysia",
            "iata": "TGG",
            "airport": "Sultan Mahmud Airport"
          },
          {
            "label": "Kuantan, Malaysia (KUA)",
            "city": "Kuantan",
            "country": "Malaysia",
            "iata": "KUA",
            "airport": "Kuantan Airport"
          },
          {
            "label": "Kubin Island, Australia (KUG)",
            "city": "Kubin Island",
            "country": "Australia",
            "iata": "KUG",
            "airport": "Kubin Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Kuching, Malaysia (KCH)",
            "city": "Kuching",
            "country": "Malaysia",
            "iata": "KCH",
            "airport": "Kuching International Airport"
          },
          {
            "label": "Kudat, Malaysia (KUD)",
            "city": "Kudat",
            "country": "Malaysia",
            "iata": "KUD",
            "airport": "Kudat Airport"
          },
          {
            "label": "Kugaaruk, Canada (YBB)",
            "city": "Kugaaruk",
            "country": "Canada",
            "iata": "YBB",
            "airport": "Kugaaruk Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kugluktuk, Canada (YCO)",
            "city": "Kugluktuk",
            "country": "Canada",
            "iata": "YCO",
            "airport": "Kugluktuk Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kulusuk, Greenland (KUS)",
            "city": "Kulusuk",
            "country": "Greenland",
            "iata": "KUS",
            "airport": "Kulusuk Airport"
          },
          {
            "label": "Kumamoto, Japan (KMJ)",
            "city": "Kumamoto",
            "country": "Japan",
            "iata": "KMJ",
            "airport": "Kumamoto Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Kumejima, Japan (UEO)",
            "city": "Kumejima",
            "country": "Japan",
            "iata": "UEO",
            "airport": "Kumejima Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Kundiawa, Papua New Guinea (CMU)",
            "city": "Kundiawa",
            "country": "Papua New Guinea",
            "iata": "CMU",
            "airport": "Chimbu Airport"
          },
          {
            "label": "Kununurra, Australia (KNX)",
            "city": "Kununurra",
            "country": "Australia",
            "iata": "KNX",
            "airport": "Kununurra Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Kuopio, Finland (KUO)",
            "city": "Kuopio",
            "country": "Finland",
            "iata": "KUO",
            "airport": "Kuopio Airport"
          },
          {
            "label": "Kupang, East Timor (KOE)",
            "city": "Kupang",
            "country": "East Timor",
            "iata": "KOE",
            "airport": "El Tari Airport"
          },
          {
            "label": "Kuqa, China (KCA)",
            "city": "Kuqa",
            "country": "China",
            "iata": "KCA",
            "airport": "Kuqa Airport"
          },
          {
            "label": "Kuressaare, Estonia (URE)",
            "city": "Kuressaare",
            "country": "Estonia",
            "iata": "URE",
            "airport": "Kuressaare Airport"
          },
          {
            "label": "Kurgan, Russia (KRO)",
            "city": "Kurgan",
            "country": "Russia",
            "iata": "KRO",
            "airport": "Kurgan Airport"
          },
          {
            "label": "Kursk, Russia (URS)",
            "city": "Kursk",
            "country": "Russia",
            "iata": "URS",
            "airport": "Kursk East Airport"
          },
          {
            "label": "Kushiro, Japan (KUH)",
            "city": "Kushiro",
            "country": "Japan",
            "iata": "KUH",
            "airport": "Kushiro Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Kutaisi, Georgia (KUT)",
            "city": "Kutaisi",
            "country": "Georgia",
            "iata": "KUT",
            "airport": "Kopitnari Airport",
          },
          {
            "label": "Kuujjuaq, Canada (YVP)",
            "city": "Kuujjuaq",
            "country": "Canada",
            "iata": "YVP",
            "airport": "Kuujjuaq Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kuujjuarapik, Canada (YGW)",
            "city": "Kuujjuarapik",
            "country": "Canada",
            "iata": "YGW",
            "airport": "Kuujjuarapik Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Kuusamo, Finland (KAO)",
            "city": "Kuusamo",
            "country": "Finland",
            "iata": "KAO",
            "airport": "Kuusamo Airport"
          },
          {
            "label": "Kwajalein, Marshall Islands (KWA)",
            "city": "Kwajalein",
            "country": "Marshall Islands",
            "iata": "KWA",
            "airport": "Bucholz Army Air Field"
          },
          {
            "label": "Kyzyl, Russia (KYZ)",
            "city": "Kyzyl",
            "country": "Russia",
            "iata": "KYZ",
            "airport": "Kyzyl Airport"
          },
          {
            "label": "Kzyl-Orda, Kazakhstan (KZO)",
            "city": "Kzyl-Orda",
            "country": "Kazakhstan",
            "iata": "KZO",
            "airport": "Kzyl-Orda Southwest Airport"
          },
          {
            "label": "La Chorrera, Colombia (LCR)",
            "city": "La Chorrera",
            "country": "Colombia",
            "iata": "LCR",
            "airport": "La Chorrera Airport",
            "currency_code": "COP"
          },
          {
            "label": "La Coruna, Spain (LCG)",
            "city": "La Coruna",
            "country": "Spain",
            "iata": "LCG",
            "airport": ""
          },
          {
            "label": "La Crosse, US (LSE)",
            "city": "La Crosse",
            "country": "US",
            "iata": "LSE",
            "airport": "La Crosse Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "La Fria, Venezuela (LFR)",
            "city": "La Fria",
            "country": "Venezuela",
            "iata": "LFR",
            "airport": "La Fria Airport"
          },
          {
            "label": "La Grande, Canada (YGL)",
            "city": "La Grande",
            "country": "Canada",
            "iata": "YGL",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "La Paz, Bolivia (LPB)",
            "city": "La Paz",
            "country": "Bolivia",
            "iata": "LPB",
            "airport": "El Alto International Airport"
          },
          {
            "label": "La Paz, Mexico (LAP)",
            "city": "La Paz",
            "country": "Mexico",
            "iata": "LAP",
            "airport": ""
          },
          {
            "label": "La Pedrera, Colombia (LPD)",
            "city": "La Pedrera",
            "country": "Colombia",
            "iata": "LPD",
            "airport": "La Pedrera Airport",
            "currency_code": "COP"
          },
          {
            "label": "La Rioja, Argentina (IRJ)",
            "city": "La Rioja",
            "country": "Argentina",
            "iata": "IRJ",
            "airport": "Capitan V A Almonacid Airport",
            "currency_code": "ARS"
          },
          {
            "label": "La Rochelle, France (LRH)",
            "city": "La Rochelle",
            "country": "France",
            "iata": "LRH",
            "airport": ""
          },
          {
            "label": "La Serena, Chile (LSC)",
            "city": "La Serena",
            "country": "Chile",
            "iata": "LSC",
            "airport": "La Florida Airport"
          },
          {
            "label": "La Tabatiere, Canada (ZLT)",
            "city": "La Tabatiere",
            "country": "Canada",
            "iata": "ZLT",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Laayoune, Morocco (EUN)",
            "city": "Laayoune",
            "country": "Morocco",
            "iata": "EUN",
            "airport": "Hassan I Airport"
          },
          {
            "label": "Labasa, Fiji (LBS)",
            "city": "Labasa",
            "country": "Fiji",
            "iata": "LBS",
            "airport": "Labasa Airport"
          },
          {
            "label": "Labuan Bajo, Indonesia (LBJ)",
            "city": "Labuan Bajo",
            "country": "Indonesia",
            "iata": "LBJ",
            "airport": "Komodo (Mutiara II) Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Labuan, Malaysia (LBU)",
            "city": "Labuan",
            "country": "Malaysia",
            "iata": "LBU",
            "airport": "Labuan Airport"
          },
          {
            "label": "Lae, Papua New Guinea (LAE)",
            "city": "Lae",
            "country": "Papua New Guinea",
            "iata": "LAE",
            "airport": "Lae Nadzab Airport"
          },
          {
            "label": "Lafayette, US (LFT)",
            "city": "Lafayette",
            "country": "US",
            "iata": "LFT",
            "airport": "Lafayette Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Lago Agrio, Ecuador (LGQ)",
            "city": "Lago Agrio",
            "country": "Ecuador",
            "iata": "LGQ",
            "airport": "Nueva Loja Airport"
          },
          {
            "label": "Lahad Datu, Malaysia (LDU)",
            "city": "Lahad Datu",
            "country": "Malaysia",
            "iata": "LDU",
            "airport": "Lahad Datu Airport"
          },
          {
            "label": "Lake Charles, US (LCH)",
            "city": "Lake Charles",
            "country": "US",
            "iata": "LCH",
            "airport": "Lake Charles Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Lake Murray, Papua New Guinea (LMY)",
            "city": "Lake Murray",
            "country": "Papua New Guinea",
            "iata": "LMY",
            "airport": "Lake Murray Airport"
          },
          {
            "label": "Lakeba, Fiji (LKB)",
            "city": "Lakeba",
            "country": "Fiji",
            "iata": "LKB",
            "airport": "Lakeba Island Airport"
          },
          {
            "label": "Lakselv, Norway (LKL)",
            "city": "Lakselv",
            "country": "Norway",
            "iata": "LKL",
            "airport": "Banak Airport"
          },
          {
            "label": "Lamap, Vanuatu (LPM)",
            "city": "Lamap",
            "country": "Vanuatu",
            "iata": "LPM",
            "airport": "Lamap Airport"
          },
          {
            "label": "Lamen Bay, Vanuatu (LNB)",
            "city": "Lamen Bay",
            "country": "Vanuatu",
            "iata": "LNB",
            "airport": "Lamen Bay Airport"
          },
          {
            "label": "Lamezia Terme, Italy (SUF)",
            "city": "Lamezia Terme",
            "country": "Italy",
            "iata": "SUF",
            "airport": "Lamezia Terme Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Lamidanda, Nepal (LDN)",
            "city": "Lamidanda",
            "country": "Nepal",
            "iata": "LDN",
            "airport": "Lamidanda Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Lampang, Thailand (LPT)",
            "city": "Lampang",
            "country": "Thailand",
            "iata": "LPT",
            "airport": "Lampang Airport",
            "currency_code": "THB"
          },
          {
            "label": "Lampedusa, Italy (LMP)",
            "city": "Lampedusa",
            "country": "Italy",
            "iata": "LMP",
            "airport": "Lampedusa Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Lamu, Kenya (LAU)",
            "city": "Lamu",
            "country": "Kenya",
            "iata": "LAU",
            "airport": "Manda Airstrip"
          },
          {
            "label": "Lanai City, US (LNY)",
            "city": "Lanai City",
            "country": "US",
            "iata": "LNY",
            "airport": "Lanai Airport",
            "currency_code": "USD"
          },
          {
            "label": "Langgur, Indonesia (LUV)",
            "city": "Langgur",
            "country": "Indonesia",
            "iata": "LUV",
            "airport": "Dumatumbun Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Lannion, France (LAI)",
            "city": "Lannion",
            "country": "France",
            "iata": "LAI",
            "airport": ""
          },
          {
            "label": "Lansdowne House, Canada (YLH)",
            "city": "Lansdowne House",
            "country": "Canada",
            "iata": "YLH",
            "airport": "Lansdowne House Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Lanseria, South Africa (HLA)",
            "city": "Lanseria",
            "country": "South Africa",
            "iata": "HLA",
            "airport": "Lanseria Airport"
          },
          {
            "label": "Lansing, US (LAN)",
            "city": "Lansing",
            "country": "US",
            "iata": "LAN",
            "airport": "Capital City Airport",
            "currency_code": "USD"
          },
          {
            "label": "Lanzarote, Spain (ACE)",
            "city": "Lanzarote",
            "country": "Spain",
            "iata": "ACE",
            "airport": "Lanzarote Airport"
          },
          {
            "label": "Lanzhou, China (LHW)",
            "city": "Lanzhou",
            "country": "China",
            "iata": "LHW",
            "airport": "Lanzhou City Airport"
          },
          {
            "label": "Laoag, Philippines (LAO)",
            "city": "Laoag",
            "country": "Philippines",
            "iata": "LAO",
            "airport": "Laoag International Airport"
          },
          {
            "label": "Laramie, US (LAR)",
            "city": "Laramie",
            "country": "US",
            "iata": "LAR",
            "airport": "Laramie Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Laredo, US (LRD)",
            "city": "Laredo",
            "country": "US",
            "iata": "LRD",
            "airport": "Laredo International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Larnaca, Cyprus (LCA)",
            "city": "Larnaca",
            "country": "Cyprus",
            "iata": "LCA",
            "airport": "Larnaca International Airport"
          },
          {
            "label": "Las Palmas, Spain (LPA)",
            "city": "Las Palmas",
            "country": "Spain",
            "iata": "LPA",
            "airport": "Gran Canaria Airport"
          },
          {
            "label": "Las Piedras, Venezuela (LSP)",
            "city": "Las Piedras",
            "country": "Venezuela",
            "iata": "LSP",
            "airport": "Josefa Camejo International Airport"
          },
          {
            "label": "Latrobe, US (LBE)",
            "city": "Latrobe",
            "country": "US",
            "iata": "LBE",
            "airport": "Arnold Palmer Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Launceston, Australia (LST)",
            "city": "Launceston",
            "country": "Australia",
            "iata": "LST",
            "airport": "Launceston Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Laurel, US (PIB)",
            "city": "Laurel",
            "country": "US",
            "iata": "PIB",
            "airport": "Hattiesburg Laurel Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Laverton, Australia (LVO)",
            "city": "Laverton",
            "country": "Australia",
            "iata": "LVO",
            "airport": "Laverton Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Lawas, Malaysia (LWY)",
            "city": "Lawas",
            "country": "Malaysia",
            "iata": "LWY",
            "airport": "Lawas Airport"
          },
          {
            "label": "Lazaro Cardenas, Mexico (LZC)",
            "city": "Lazaro Cardenas",
            "country": "Mexico",
            "iata": "LZC",
            "airport": ""
          },
          {
            "label": "Le Havre, France (LEH)",
            "city": "Le Havre",
            "country": "France",
            "iata": "LEH",
            "airport": "Le Havre Octeville Airport"
          },
          {
            "label": "Le Puy, France (LPY)",
            "city": "Le Puy",
            "country": "France",
            "iata": "LPY",
            "airport": "Le Puy-Loudes Airport"
          },
          {
            "label": "Learmonth, Australia (LEA)",
            "city": "Learmonth",
            "country": "Australia",
            "iata": "LEA",
            "airport": "Learmonth Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Leeds, UK (LBA)",
            "city": "Leeds",
            "country": "UK",
            "iata": "LBA",
            "airport": "Leeds Bradford Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Legaspi, Philippines (LGP)",
            "city": "Legaspi",
            "country": "Philippines",
            "iata": "LGP",
            "airport": "Legazpi City International Airport"
          },
          {
            "label": "Leinster, Australia (LER)",
            "city": "Leinster",
            "country": "Australia",
            "iata": "LER",
            "airport": "Leinster Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Leipzig/Halle, Germany (LEJ)",
            "city": "Leipzig/Halle",
            "country": "Germany",
            "iata": "LEJ",
            "airport": "Leipzig Halle Airport"
          },
          {
            "label": "Leknes, Norway (LKN)",
            "city": "Leknes",
            "country": "Norway",
            "iata": "LKN",
            "airport": "Leknes Airport"
          },
          {
            "label": "Leon, Spain (LEN)",
            "city": "Leon",
            "country": "Spain",
            "iata": "LEN",
            "airport": "Leon Airport"
          },
          {
            "label": "Leon/Guanajuato, Mexico (BJX)",
            "city": "Leon/Guanajuato",
            "country": "Mexico",
            "iata": "BJX",
            "airport": ""
          },
          {
            "label": "Leonora, Australia (LNO)",
            "city": "Leonora",
            "country": "Australia",
            "iata": "LNO",
            "airport": "Leonora Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Leros, Greece (LRS)",
            "city": "Leros",
            "country": "Greece",
            "iata": "LRS",
            "airport": "Leros Airport"
          },
          {
            "label": "Lethbridge, Canada (YQL)",
            "city": "Lethbridge",
            "country": "Canada",
            "iata": "YQL",
            "airport": "Lethbridge County Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Leticia, Colombia (LET)",
            "city": "Leticia",
            "country": "Colombia",
            "iata": "LET",
            "airport": "",
            "currency_code": "COP"
          },
          {
            "label": "Lewiston, US (LWS)",
            "city": "Lewiston",
            "country": "US",
            "iata": "LWS",
            "airport": "Lewiston Nez Perce County Airport",
            "currency_code": "USD"
          },
          {
            "label": "Lewistown, US (LWT)",
            "city": "Lewistown",
            "country": "US",
            "iata": "LWT",
            "airport": "Lewistown Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Lexington, US (LEX)",
            "city": "Lexington",
            "country": "US",
            "iata": "LEX",
            "airport": "Blue Grass Airport",
            "currency_code": "USD"
          },
          {
            "label": "Lhasa, China (LXA)",
            "city": "Lhasa",
            "country": "China",
            "iata": "LXA",
            "airport": "Lhasa Gonggar Airport"
          },
          {
            "label": "Lianyungang, China (LYG)",
            "city": "Lianyungang",
            "country": "China",
            "iata": "LYG",
            "airport": "Lianyungang Airport"
          },
          {
            "label": "Liberal, US (LBL)",
            "city": "Liberal",
            "country": "US",
            "iata": "LBL",
            "airport": "Liberal Mid-America Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Libreville, Gabon (LBV)",
            "city": "Libreville",
            "country": "Gabon",
            "iata": "LBV",
            "airport": "Leon M Ba Airport"
          },
          {
            "label": "Lichinga, Mozambique (VXC)",
            "city": "Lichinga",
            "country": "Mozambique",
            "iata": "VXC",
            "airport": "Lichinga Airport"
          },
          {
            "label": "Liepaya, Latvia (LPX)",
            "city": "Liepaya",
            "country": "Latvia",
            "iata": "LPX",
            "airport": "Liepaja International Airport"
          },
          {
            "label": "Lifou, New Caledonia (LIF)",
            "city": "Lifou",
            "country": "New Caledonia",
            "iata": "LIF",
            "airport": "Lifou Airport"
          },
          {
            "label": "Lihir Island, Papua New Guinea (LNV)",
            "city": "Lihir Island",
            "country": "Papua New Guinea",
            "iata": "LNV",
            "airport": "Londolovit Airport"
          },
          {
            "label": "Lijiang City, China (LJG)",
            "city": "Lijiang City",
            "country": "China",
            "iata": "LJG",
            "airport": "Lijiang Airport"
          },
          {
            "label": "Lille, France (LIL)",
            "city": "Lille",
            "country": "France",
            "iata": "LIL",
            "airport": "Lille-Lesquin Airport"
          },
          {
            "label": "Lilongwe, Malawi (LLW)",
            "city": "Lilongwe",
            "country": "Malawi",
            "iata": "LLW",
            "airport": "Lilongwe International Airport"
          },
          {
            "label": "Lima, Peru (LIM)",
            "city": "Lima",
            "country": "Peru",
            "iata": "LIM",
            "airport": ""
          },
          {
            "label": "Limbang, Malaysia (LMN)",
            "city": "Limbang",
            "country": "Malaysia",
            "iata": "LMN",
            "airport": "Limbang Airport"
          },
          {
            "label": "Limnos, Greece (LXS)",
            "city": "Limnos",
            "country": "Greece",
            "iata": "LXS",
            "airport": "Limnos Airport"
          },
          {
            "label": "Limoges, France (LIG)",
            "city": "Limoges",
            "country": "France",
            "iata": "LIG",
            "airport": "Limoges Airport"
          },
          {
            "label": "Lincoln, US (LNK)",
            "city": "Lincoln",
            "country": "US",
            "iata": "LNK",
            "airport": "Lincoln Airport",
            "currency_code": "USD"
          },
          {
            "label": "Lindi, Tanzania (LDI)",
            "city": "Lindi",
            "country": "Tanzania",
            "iata": "LDI",
            "airport": "Kikwetu Airport"
          },
          {
            "label": "Linkoping, Sweden (LPI)",
            "city": "Linkoping",
            "country": "Sweden",
            "iata": "LPI",
            "airport": ""
          },
          {
            "label": "Linyi, China (LYI)",
            "city": "Linyi",
            "country": "China",
            "iata": "LYI",
            "airport": "Shubuling Airport"
          },
          {
            "label": "Linz, Austria (LNZ)",
            "city": "Linz",
            "country": "Austria",
            "iata": "LNZ",
            "airport": "Linz Airport"
          },
          {
            "label": "Lipetsk, Russia (LPK)",
            "city": "Lipetsk",
            "country": "Russia",
            "iata": "LPK",
            "airport": "Lipetsk Airport"
          },
          {
            "label": "Lismore, Australia (LSY)",
            "city": "Lismore",
            "country": "Australia",
            "iata": "LSY",
            "airport": "Lismore Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Little Rock, US (LIT)",
            "city": "Little Rock",
            "country": "US",
            "iata": "LIT",
            "airport": "Adams Field",
            "currency_code": "USD"
          },
          {
            "label": "Liuzhou, China (LZH)",
            "city": "Liuzhou",
            "country": "China",
            "iata": "LZH",
            "airport": "Bailian Airport"
          },
          {
            "label": "Liverpool, UK (LPL)",
            "city": "Liverpool",
            "country": "UK",
            "iata": "LPL",
            "airport": "Liverpool John Lennon Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Livingstone, Zambia (LVI)",
            "city": "Livingstone",
            "country": "Zambia",
            "iata": "LVI",
            "airport": "Livingstone Airport"
          },
          {
            "label": "Livramento, Brazil (LVB)",
            "city": "Livramento",
            "country": "Brazil",
            "iata": "LVB",
            "airport": "Livramento do Brumado Airport"
          },
          {
            "label": "Ljubljana, Slovenia (LJU)",
            "city": "Ljubljana",
            "country": "Slovenia",
            "iata": "LJU",
            "airport": ""
          },
          {
            "label": "Lloydminster, Canada (YLL)",
            "city": "Lloydminster",
            "country": "Canada",
            "iata": "YLL",
            "airport": "Lloydminster Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Lockhart River, Australia (IRG)",
            "city": "Lockhart River",
            "country": "Australia",
            "iata": "IRG",
            "airport": "Lockhart River Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Lodz, Poland (LCJ)",
            "city": "Lodz",
            "country": "Poland",
            "iata": "LCJ",
            "airport": ""
          },
          {
            "label": "Logrono, Spain (RJL)",
            "city": "Logrono",
            "country": "Spain",
            "iata": "RJL",
            "airport": ""
          },
          {
            "label": "Loja, Ecuador (LOH)",
            "city": "Loja",
            "country": "Ecuador",
            "iata": "LOH",
            "airport": "Camilo Ponce Enriquez Airport"
          },
          {
            "label": "Lokichoggio, Kenya (LKG)",
            "city": "Lokichoggio",
            "country": "Kenya",
            "iata": "LKG",
            "airport": "Lokichoggio Airport"
          },
          {
            "label": "Lome, Togo (LFW)",
            "city": "Lome",
            "country": "Togo",
            "iata": "LFW",
            "airport": ""
          },
          {
            "label": "Londonderry, UK (LDY)",
            "city": "Londonderry",
            "country": "UK",
            "iata": "LDY",
            "airport": "City of Derry Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Londrina, Brazil (LDB)",
            "city": "Londrina",
            "country": "Brazil",
            "iata": "LDB",
            "airport": "Governador José Richa Airport"
          },
          {
            "label": "Long Akah, Malaysia (LKH)",
            "city": "Long Akah",
            "country": "Malaysia",
            "iata": "LKH",
            "airport": "Long Akah Airport"
          },
          {
            "label": "Long Banga, Malaysia (LBP)",
            "city": "Long Banga",
            "country": "Malaysia",
            "iata": "LBP",
            "airport": "Long Banga Airport"
          },
          {
            "label": "Long Beach, US (LGB)",
            "city": "Long Beach",
            "country": "US",
            "iata": "LGB",
            "airport": "Long Beach /Daugherty Field/ Airport",
            "currency_code": "USD"
          },
          {
            "label": "Long Lellang, Malaysia (LGL)",
            "city": "Long Lellang",
            "country": "Malaysia",
            "iata": "LGL",
            "airport": "Long Lellang Airport"
          },
          {
            "label": "Long Seridan, Malaysia (ODN)",
            "city": "Long Seridan",
            "country": "Malaysia",
            "iata": "ODN",
            "airport": "Long Seridan Airport"
          },
          {
            "label": "Longana, Vanuatu (LOD)",
            "city": "Longana",
            "country": "Vanuatu",
            "iata": "LOD",
            "airport": "Longana Airport"
          },
          {
            "label": "Longreach, Australia (LRE)",
            "city": "Longreach",
            "country": "Australia",
            "iata": "LRE",
            "airport": "Longreach Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Longyan, China (LCX)",
            "city": "Longyan",
            "country": "China",
            "iata": "LCX",
            "airport": "Longyan Guanzhishan Airport"
          },
          {
            "label": "Longyearbyen, Svalbard (LYR)",
            "city": "Longyearbyen",
            "country": "Svalbard",
            "iata": "LYR",
            "airport": "Svalbard Airport, Longyear"
          },
          {
            "label": "Lonorore, Vanuatu (LNE)",
            "city": "Lonorore",
            "country": "Vanuatu",
            "iata": "LNE",
            "airport": "Lonorore Airport"
          },
          {
            "label": "Lopez Island, US (LPS)",
            "city": "Lopez Island",
            "country": "US",
            "iata": "LPS",
            "airport": "Lopez Island Airport",
            "currency_code": "USD"
          },
          {
            "label": "Lord Howe Island, Australia (LDH)",
            "city": "Lord Howe Island",
            "country": "Australia",
            "iata": "LDH",
            "airport": "Lord Howe Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Loreto, Mexico (LTO)",
            "city": "Loreto",
            "country": "Mexico",
            "iata": "LTO",
            "airport": "Loreto International Airport"
          },
          {
            "label": "Lorient, France (LRT)",
            "city": "Lorient",
            "country": "France",
            "iata": "LRT",
            "airport": "Lorient South Brittany (Bretagne Sud) Airport"
          },
          {
            "label": "Los Mochis, Mexico (LMM)",
            "city": "Los Mochis",
            "country": "Mexico",
            "iata": "LMM",
            "airport": "Valle del Fuerte International Airport"
          },
          {
            "label": "Losuia, Papua New Guinea (LSA)",
            "city": "Losuia",
            "country": "Papua New Guinea",
            "iata": "LSA",
            "airport": "Losuia Airport"
          },
          {
            "label": "Louisville, US (SDF)",
            "city": "Louisville",
            "country": "US",
            "iata": "SDF",
            "airport": "Louisville International Standiford Field",
            "currency_code": "USD"
          },
          {
            "label": "Lourdes/Tarbes, France (LDE)",
            "city": "Lourdes/Tarbes",
            "country": "France",
            "iata": "LDE",
            "airport": ""
          },
          {
            "label": "Luang Prabang, Laos (LPQ)",
            "city": "Luang Prabang",
            "country": "Laos",
            "iata": "LPQ",
            "airport": "Luang Phabang International Airport"
          },
          {
            "label": "Lubango, Angola (SDD)",
            "city": "Lubango",
            "country": "Angola",
            "iata": "SDD",
            "airport": "Lubango Airport",
            "currency_code": "AOA"
          },
          {
            "label": "Lubbock, US (LBB)",
            "city": "Lubbock",
            "country": "US",
            "iata": "LBB",
            "airport": "Lubbock Preston Smith International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Lubumbashi, Democratic Republic of the Congo (FBM)",
            "city": "Lubumbashi",
            "country": "Democratic Republic of the Congo",
            "iata": "FBM",
            "airport": "Lubumbashi International Airport"
          },
          {
            "label": "Luderitz, Namibia (LUD)",
            "city": "Luderitz",
            "country": "Namibia",
            "iata": "LUD",
            "airport": "Luderitz Airport"
          },
          {
            "label": "Luebeck, Germany (LBC)",
            "city": "Luebeck",
            "country": "Germany",
            "iata": "LBC",
            "airport": ""
          },
          {
            "label": "Lugano, Switzerland (LUG)",
            "city": "Lugano",
            "country": "Switzerland",
            "iata": "LUG",
            "airport": "Lugano Airport"
          },
          {
            "label": "Lugansk, Ukraine (VSG)",
            "city": "Lugansk",
            "country": "Ukraine",
            "iata": "VSG",
            "airport": "Luhansk International Airport"
          },
          {
            "label": "Lukla, Nepal (LUA)",
            "city": "Lukla",
            "country": "Nepal",
            "iata": "LUA",
            "airport": "Lukla Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Lulea, Sweden (LLA)",
            "city": "Lulea",
            "country": "Sweden",
            "iata": "LLA",
            "airport": ""
          },
          {
            "label": "Luoyang, China (LYA)",
            "city": "Luoyang",
            "country": "China",
            "iata": "LYA",
            "airport": "Luoyang Airport"
          },
          {
            "label": "Lutselke/Snowdrift, Canada (YSG)",
            "city": "Lutselke/Snowdrift",
            "country": "Canada",
            "iata": "YSG",
            "airport": "Lutselk'e Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Luxembourg, Luxembourg (LUX)",
            "city": "Luxembourg",
            "country": "Luxembourg",
            "iata": "LUX",
            "airport": "Luxembourg-Findel International Airport"
          },
          {
            "label": "Luxi, China (LUM)",
            "city": "Luxi",
            "country": "China",
            "iata": "LUM",
            "airport": "Mangshi Airport"
          },
          {
            "label": "Luxor, Egypt (LXR)",
            "city": "Luxor",
            "country": "Egypt",
            "iata": "LXR",
            "airport": "Luxor International Airport"
          },
          {
            "label": "Luzhou, China (LZO)",
            "city": "Luzhou",
            "country": "China",
            "iata": "LZO",
            "airport": "Luzhou Airport"
          },
          {
            "label": "Luzon Is, Philippines (CRK)",
            "city": "Luzon Is",
            "country": "Philippines",
            "iata": "CRK",
            "airport": "Diosdado Macapagal International Airport"
          },
          {
            "label": "Lviv, Ukraine (LWO)",
            "city": "Lviv",
            "country": "Ukraine",
            "iata": "LWO",
            "airport": "Lviv International Airport"
          },
          {
            "label": "Lycksele, Sweden (LYC)",
            "city": "Lycksele",
            "country": "Sweden",
            "iata": "LYC",
            "airport": "Lycksele Airport"
          },
          {
            "label": "Lynchburg, US (LYH)",
            "city": "Lynchburg",
            "country": "US",
            "iata": "LYH",
            "airport": "Lynchburg Regional Preston Glenn Field",
            "currency_code": "USD"
          },
          {
            "label": "Lynn Lake, Canada (YYL)",
            "city": "Lynn Lake",
            "country": "Canada",
            "iata": "YYL",
            "airport": "Lynn Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Lyon, France (LYS)",
            "city": "Lyon",
            "country": "France",
            "iata": "LYS",
            "airport": ""
          },
          {
            "label": "Maastricht, Netherlands (MST)",
            "city": "Maastricht",
            "country": "Netherlands",
            "iata": "MST",
            "airport": "Maastricht Aachen Airport"
          },
          {
            "label": "Mabuiag Island, Australia (UBB)",
            "city": "Mabuiag Island",
            "country": "Australia",
            "iata": "UBB",
            "airport": "Mabuiag Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Macae, Brazil (MEA)",
            "city": "Macae",
            "country": "Brazil",
            "iata": "MEA",
            "airport": "Benedito Lacerda Airport"
          },
          {
            "label": "Macapa, Brazil (MCP)",
            "city": "Macapa",
            "country": "Brazil",
            "iata": "MCP",
            "airport": "Alberto Alcolumbre Airport"
          },
          {
            "label": "Macas, Ecuador (XMS)",
            "city": "Macas",
            "country": "Ecuador",
            "iata": "XMS",
            "airport": "Coronel E Carvajal Airport"
          },
          {
            "label": "Maceio, Brazil (MCZ)",
            "city": "Maceio",
            "country": "Brazil",
            "iata": "MCZ",
            "airport": "Zumbi dos Palmares Airport"
          },
          {
            "label": "Mackay, Australia (MKY)",
            "city": "Mackay",
            "country": "Australia",
            "iata": "MKY",
            "airport": "Mackay Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Macon, US (MCN)",
            "city": "Macon",
            "country": "US",
            "iata": "MCN",
            "airport": "Middle Georgia Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Madang, Papua New Guinea (MAG)",
            "city": "Madang",
            "country": "Papua New Guinea",
            "iata": "MAG",
            "airport": "Madang Airport"
          },
          {
            "label": "Madeira, Portugal (FNC)",
            "city": "Madeira",
            "country": "Portugal",
            "iata": "FNC",
            "airport": "Madeira Airport"
          },
          {
            "label": "Madison, US (MSN)",
            "city": "Madison",
            "country": "US",
            "iata": "MSN",
            "airport": "Dane County Regional Truax Field",
            "currency_code": "USD"
          },
          {
            "label": "Mae Hong Son, Thailand (HGN)",
            "city": "Mae Hong Son",
            "country": "Thailand",
            "iata": "HGN",
            "airport": "Mae Hong Son Airport",
            "currency_code": "THB"
          },
          {
            "label": "Maewo, Vanuatu (MWF)",
            "city": "Maewo",
            "country": "Vanuatu",
            "iata": "MWF",
            "airport": "Naone Airport"
          },
          {
            "label": "Magadan, Russia (GDX)",
            "city": "Magadan",
            "country": "Russia",
            "iata": "GDX",
            "airport": "Sokol Airport"
          },
          {
            "label": "Magnitogorsk, Russia (MQF)",
            "city": "Magnitogorsk",
            "country": "Russia",
            "iata": "MQF",
            "airport": "Magnitogorsk International Airport"
          },
          {
            "label": "Maintirano, Madagascar (MXT)",
            "city": "Maintirano",
            "country": "Madagascar",
            "iata": "MXT",
            "airport": "Maintirano Airport"
          },
          {
            "label": "Maio, Cape Verde (MMO)",
            "city": "Maio",
            "country": "Cape Verde",
            "iata": "MMO",
            "airport": "Maio Airport"
          },
          {
            "label": "Majunga, Madagascar (MJN)",
            "city": "Majunga",
            "country": "Madagascar",
            "iata": "MJN",
            "airport": "Amborovy Airport"
          },
          {
            "label": "Majuro, Marshall Islands (MAJ)",
            "city": "Majuro",
            "country": "Marshall Islands",
            "iata": "MAJ",
            "airport": "Marshall Islands International Airport"
          },
          {
            "label": "Makale, Ethiopia (MQX)",
            "city": "Makale",
            "country": "Ethiopia",
            "iata": "MQX",
            "airport": "Mekele Airport"
          },
          {
            "label": "Makhachkala, Russia (MCX)",
            "city": "Makhachkala",
            "country": "Russia",
            "iata": "MCX",
            "airport": "Uytash Airport"
          },
          {
            "label": "Makkovik, Canada (YMN)",
            "city": "Makkovik",
            "country": "Canada",
            "iata": "YMN",
            "airport": "Makkovik Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Makokou, Gabon (MKU)",
            "city": "Makokou",
            "country": "Gabon",
            "iata": "MKU",
            "airport": "Makokou Airport"
          },
          {
            "label": "Makung, Taiwan (MZG)",
            "city": "Makung",
            "country": "Taiwan",
            "iata": "MZG",
            "airport": "Makung Airport"
          },
          {
            "label": "Mala Mala, South Africa (AAM)",
            "city": "Mala Mala",
            "country": "South Africa",
            "iata": "AAM",
            "airport": "Malamala Airport"
          },
          {
            "label": "Malabo, Equatorial Guinea (SSG)",
            "city": "Malabo",
            "country": "Equatorial Guinea",
            "iata": "SSG",
            "airport": "Malabo Airport"
          },
          {
            "label": "Malaga, Spain (AGP)",
            "city": "Malaga",
            "country": "Spain",
            "iata": "AGP",
            "airport": ""
          },
          {
            "label": "Malang, Indonesia (MLG)",
            "city": "Malang",
            "country": "Indonesia",
            "iata": "MLG",
            "airport": "Abdul Rachman Saleh Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Malatya, Turkey (MLX)",
            "city": "Malatya",
            "country": "Turkey",
            "iata": "MLX",
            "airport": ""
          },
          {
            "label": "Malindi, Kenya (MYD)",
            "city": "Malindi",
            "country": "Kenya",
            "iata": "MYD",
            "airport": "Malindi Airport"
          },
          {
            "label": "Malmo, Sweden (MMX)",
            "city": "Malmo",
            "country": "Sweden",
            "iata": "MMX",
            "airport": ""
          },
          {
            "label": "Malololailai, Fiji (PTF)",
            "city": "Malololailai",
            "country": "Fiji",
            "iata": "PTF",
            "airport": "Malolo Lailai Island Airport"
          },
          {
            "label": "Malta, Malta (MLA)",
            "city": "Malta",
            "country": "Malta",
            "iata": "MLA",
            "airport": "Luqa Airport"
          },
          {
            "label": "Mana Island, Fiji (MNF)",
            "city": "Mana Island",
            "country": "Fiji",
            "iata": "MNF",
            "airport": "Mana Island Airport"
          },
          {
            "label": "Manado, Indonesia (MDC)",
            "city": "Manado",
            "country": "Indonesia",
            "iata": "MDC",
            "airport": "Sam Ratulangi Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Mananjary, Madagascar (MNJ)",
            "city": "Mananjary",
            "country": "Madagascar",
            "iata": "MNJ",
            "airport": "Mananjary Airport"
          },
          {
            "label": "Manaus, Brazil (MAO)",
            "city": "Manaus",
            "country": "Brazil",
            "iata": "MAO",
            "airport": "Eduardo Gomes International Airport"
          },
          {
            "label": "Mangaia Island, Cook Islands (MGS)",
            "city": "Mangaia Island",
            "country": "Cook Islands",
            "iata": "MGS",
            "airport": "Mangaia Island Airport"
          },
          {
            "label": "Manhattan, US (MHK)",
            "city": "Manhattan",
            "country": "US",
            "iata": "MHK",
            "airport": "Manhattan Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Maningrida, Australia (MNG)",
            "city": "Maningrida",
            "country": "Australia",
            "iata": "MNG",
            "airport": "Maningrida Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Manizales, Colombia (MZL)",
            "city": "Manizales",
            "country": "Colombia",
            "iata": "MZL",
            "airport": "La Nubia Airport",
            "currency_code": "COP"
          },
          {
            "label": "Manja, Madagascar (MJA)",
            "city": "Manja",
            "country": "Madagascar",
            "iata": "MJA",
            "airport": "Manja Airport"
          },
          {
            "label": "Mannheim, Germany (MHG)",
            "city": "Mannheim",
            "country": "Germany",
            "iata": "MHG",
            "airport": "Mannheim-City Airport"
          },
          {
            "label": "Manokwari, Indonesia (MKW)",
            "city": "Manokwari",
            "country": "Indonesia",
            "iata": "MKW",
            "airport": "Rendani Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Manta, Ecuador (MEC)",
            "city": "Manta",
            "country": "Ecuador",
            "iata": "MEC",
            "airport": "Eloy Alfaro International Airport"
          },
          {
            "label": "Manus Island, Papua New Guinea (MAS)",
            "city": "Manus Island",
            "country": "Papua New Guinea",
            "iata": "MAS",
            "airport": "Momote Airport"
          },
          {
            "label": "Manzanillo, Mexico (ZLO)",
            "city": "Manzanillo",
            "country": "Mexico",
            "iata": "ZLO",
            "airport": "Playa De Oro International Airport"
          },
          {
            "label": "Manzini, Swaziland (MTS)",
            "city": "Manzini",
            "country": "Swaziland",
            "iata": "MTS",
            "airport": "Matsapha Airport"
          },
          {
            "label": "Maputo, Mozambique (MPM)",
            "city": "Maputo",
            "country": "Mozambique",
            "iata": "MPM",
            "airport": "Maputo Airport"
          },
          {
            "label": "Mar del Plata, Argentina (MDQ)",
            "city": "Mar del Plata",
            "country": "Argentina",
            "iata": "MDQ",
            "airport": "",
            "currency_code": "ARS"
          },
          {
            "label": "Mara Lodges, Kenya (MRE)",
            "city": "Mara Lodges",
            "country": "Kenya",
            "iata": "MRE",
            "airport": "Mara Serena Lodge Airstrip"
          },
          {
            "label": "Maraba, Brazil (MAB)",
            "city": "Maraba",
            "country": "Brazil",
            "iata": "MAB",
            "airport": "João Correa da Rocha Airport"
          },
          {
            "label": "Maracaibo, Venezuela (MAR)",
            "city": "Maracaibo",
            "country": "Venezuela",
            "iata": "MAR",
            "airport": "La Chinita International Airport"
          },
          {
            "label": "Marau Sound, Solomon Islands (RUS)",
            "city": "Marau Sound",
            "country": "Solomon Islands",
            "iata": "RUS",
            "airport": "Marau Airport"
          },
          {
            "label": "Mardin, Turkey (MQM)",
            "city": "Mardin",
            "country": "Turkey",
            "iata": "MQM",
            "airport": "Mardin Airport"
          },
          {
            "label": "Mare, New Caledonia (MEE)",
            "city": "Mare",
            "country": "New Caledonia",
            "iata": "MEE",
            "airport": ""
          },
          {
            "label": "Margate, South Africa (MGH)",
            "city": "Margate",
            "country": "South Africa",
            "iata": "MGH",
            "airport": "Margate Airport"
          },
          {
            "label": "Mariehamn, Finland (MHQ)",
            "city": "Mariehamn",
            "country": "Finland",
            "iata": "MHQ",
            "airport": "Mariehamn Airport"
          },
          {
            "label": "Marietta/Parkersburg, US (PKB)",
            "city": "Marietta/Parkersburg",
            "country": "US",
            "iata": "PKB",
            "airport": "Mid Ohio Valley Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Marilia, Brazil (MII)",
            "city": "Marilia",
            "country": "Brazil",
            "iata": "MII",
            "airport": ""
          },
          {
            "label": "Maringa, Brazil (MGF)",
            "city": "Maringa",
            "country": "Brazil",
            "iata": "MGF",
            "airport": ""
          },
          {
            "label": "Mariupol, Ukraine (MPW)",
            "city": "Mariupol",
            "country": "Ukraine",
            "iata": "MPW",
            "airport": "Mariupol International Airport"
          },
          {
            "label": "Maroantsetra, Madagascar (WMN)",
            "city": "Maroantsetra",
            "country": "Madagascar",
            "iata": "WMN",
            "airport": "Maroantsetra Airport"
          },
          {
            "label": "Marrakesh, Morocco (RAK)",
            "city": "Marrakesh",
            "country": "Morocco",
            "iata": "RAK",
            "airport": "Menara Airport"
          },
          {
            "label": "Marsa Alam, Egypt (RMF)",
            "city": "Marsa Alam",
            "country": "Egypt",
            "iata": "RMF",
            "airport": "Marsa Alam International Airport"
          },
          {
            "label": "Marseille, France (MRS)",
            "city": "Marseille",
            "country": "France",
            "iata": "MRS",
            "airport": "Marseille Provence Airport"
          },
          {
            "label": "Martha's Vineyard, US (MVY)",
            "city": "Martha's Vineyard",
            "country": "US",
            "iata": "MVY",
            "airport": "Martha's Vineyard Airport",
            "currency_code": "USD"
          },
          {
            "label": "Marudi, Malaysia (MUR)",
            "city": "Marudi",
            "country": "Malaysia",
            "iata": "MUR",
            "airport": "Marudi Airport"
          },
          {
            "label": "Mary's Harbour, Canada (YMH)",
            "city": "Mary's Harbour",
            "country": "Canada",
            "iata": "YMH",
            "airport": "Mary's Harbour Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Masbate, Philippines (MBT)",
            "city": "Masbate",
            "country": "Philippines",
            "iata": "MBT",
            "airport": "Moises R. Espinosa Airport"
          },
          {
            "label": "Maseru, Lesotho (MSU)",
            "city": "Maseru",
            "country": "Lesotho",
            "iata": "MSU",
            "airport": "Moshoeshoe I International Airport"
          },
          {
            "label": "Massawa, Eritrea (MSW)",
            "city": "Massawa",
            "country": "Eritrea",
            "iata": "MSW",
            "airport": "Massawa International Airport"
          },
          {
            "label": "Massena, US (MSS)",
            "city": "Massena",
            "country": "US",
            "iata": "MSS",
            "airport": "Massena International Richards Field",
            "currency_code": "USD"
          },
          {
            "label": "Masset, Canada (ZMT)",
            "city": "Masset",
            "country": "Canada",
            "iata": "ZMT",
            "airport": "Masset Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Masvingo, Zimbabwe (MVZ)",
            "city": "Masvingo",
            "country": "Zimbabwe",
            "iata": "MVZ",
            "airport": "Masvingo International Airport"
          },
          {
            "label": "Matamoros, Mexico (MAM)",
            "city": "Matamoros",
            "country": "Mexico",
            "iata": "MAM",
            "airport": "General Servando Canales International Airport"
          },
          {
            "label": "Mataram, Indonesia (AMI)",
            "city": "Mataram",
            "country": "Indonesia",
            "iata": "AMI",
            "airport": "Selaparang Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Matsu, Taiwan (MFK)",
            "city": "Matsu",
            "country": "Taiwan",
            "iata": "MFK",
            "airport": "Matsu Beigan Airport"
          },
          {
            "label": "Matsuyama, Japan (MYJ)",
            "city": "Matsuyama",
            "country": "Japan",
            "iata": "MYJ",
            "airport": "Matsuyama Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Maturin, Venezuela (MUN)",
            "city": "Maturin",
            "country": "Venezuela",
            "iata": "MUN",
            "airport": ""
          },
          {
            "label": "Mauke Island, Cook Islands (MUK)",
            "city": "Mauke Island",
            "country": "Cook Islands",
            "iata": "MUK",
            "airport": "Mauke Airport"
          },
          {
            "label": "Maumere, Indonesia (MOF)",
            "city": "Maumere",
            "country": "Indonesia",
            "iata": "MOF",
            "airport": "Maumere(Wai Oti) Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Mazar-I-Sharif, Afghanistan (MZR)",
            "city": "Mazar-I-Sharif",
            "country": "Afghanistan",
            "iata": "MZR",
            "airport": "Mazar I Sharif Airport",
            "currency_code": "AFN"
          },
          {
            "label": "Mazatlan, Mexico (MZT)",
            "city": "Mazatlan",
            "country": "Mexico",
            "iata": "MZT",
            "airport": "General Rafael Buelna International Airport"
          },
          {
            "label": "Mbambanakira, Solomon Islands (MBU)",
            "city": "Mbambanakira",
            "country": "Solomon Islands",
            "iata": "MBU",
            "airport": "Babanakira Airport"
          },
          {
            "label": "Mbandaka, Democratic Republic of the Congo (MDK)",
            "city": "Mbandaka",
            "country": "Democratic Republic of the Congo",
            "iata": "MDK",
            "airport": "Mbandaka Airport"
          },
          {
            "label": "Mbuji Mayi, Democratic Republic of the Congo (MJM)",
            "city": "Mbuji Mayi",
            "country": "Democratic Republic of the Congo",
            "iata": "MJM",
            "airport": "Mbuji Mayi Airport"
          },
          {
            "label": "Mcallen/Mission, US (MFE)",
            "city": "Mcallen/Mission",
            "country": "US",
            "iata": "MFE",
            "airport": "Mc Allen Miller International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Mcarthur River, Australia (MCV)",
            "city": "Mcarthur River",
            "country": "Australia",
            "iata": "MCV",
            "airport": "McArthur River Mine Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Mcgrath, US (MCG)",
            "city": "Mcgrath",
            "country": "US",
            "iata": "MCG",
            "airport": "McGrath Airport",
            "currency_code": "USD"
          },
          {
            "label": "Medan, Indonesia (MES)",
            "city": "Medan",
            "country": "Indonesia",
            "iata": "MES",
            "airport": "Polonia International Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Medellin, Colombia (EOH)",
            "city": "Medellin",
            "country": "Colombia",
            "iata": "EOH",
            "airport": "Enrique Olaya Herrera Airport",
            "currency_code": "COP"
          },
          {
            "label": "Medellin, Colombia (MDE)",
            "city": "Medellin",
            "country": "Colombia",
            "iata": "MDE",
            "airport": "",
            "currency_code": "COP"
          },
          {
            "label": "Medford, US (MFR)",
            "city": "Medford",
            "country": "US",
            "iata": "MFR",
            "airport": "Rogue Valley International Medford Airport",
            "currency_code": "USD"
          },
          {
            "label": "Medicine Hat, Canada (YXH)",
            "city": "Medicine Hat",
            "country": "Canada",
            "iata": "YXH",
            "airport": "Medicine Hat Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Meekatharra, Australia (MKR)",
            "city": "Meekatharra",
            "country": "Australia",
            "iata": "MKR",
            "airport": "Meekatharra Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Meghauli, Nepal (MEY)",
            "city": "Meghauli",
            "country": "Nepal",
            "iata": "MEY",
            "airport": "Meghauli Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Mehamn, Norway (MEH)",
            "city": "Mehamn",
            "country": "Norway",
            "iata": "MEH",
            "airport": "Mehamn Airport"
          },
          {
            "label": "Meixian, China (MXZ)",
            "city": "Meixian",
            "country": "China",
            "iata": "MXZ",
            "airport": "Meixian Airport"
          },
          {
            "label": "Mekoryuk, US (MYU)",
            "city": "Mekoryuk",
            "country": "US",
            "iata": "MYU",
            "airport": "Mekoryuk Airport",
            "currency_code": "USD"
          },
          {
            "label": "Melilla, Spain (MLN)",
            "city": "Melilla",
            "country": "Spain",
            "iata": "MLN",
            "airport": "Melilla Airport"
          },
          {
            "label": "Memanbetsu, Japan (MMB)",
            "city": "Memanbetsu",
            "country": "Japan",
            "iata": "MMB",
            "airport": "Memanbetsu Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Memmingen, Germany (FMM)",
            "city": "Memmingen",
            "country": "Germany",
            "iata": "FMM",
            "airport": "Memmingen Allgau Airport"
          },
          {
            "label": "Memphis, US (MEM)",
            "city": "Memphis",
            "country": "US",
            "iata": "MEM",
            "airport": "Memphis International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Mendi, Papua New Guinea (MDU)",
            "city": "Mendi",
            "country": "Papua New Guinea",
            "iata": "MDU",
            "airport": "Mendi Airport"
          },
          {
            "label": "Mendoza, Argentina (MDZ)",
            "city": "Mendoza",
            "country": "Argentina",
            "iata": "MDZ",
            "airport": "El Plumerillo Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Menorca, Spain (MAH)",
            "city": "Menorca",
            "country": "Spain",
            "iata": "MAH",
            "airport": "Menorca Airport"
          },
          {
            "label": "Merauke, Indonesia (MKQ)",
            "city": "Merauke",
            "country": "Indonesia",
            "iata": "MKQ",
            "airport": "Mopah Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Merced, US (MCE)",
            "city": "Merced",
            "country": "US",
            "iata": "MCE",
            "airport": "Merced Regional Macready Field",
            "currency_code": "USD"
          },
          {
            "label": "Merida, Mexico (MID)",
            "city": "Merida",
            "country": "Mexico",
            "iata": "MID",
            "airport": "Licenciado Manuel Crescencio Rejon Int Airport"
          },
          {
            "label": "Merida, Venezuela (MRD)",
            "city": "Merida",
            "country": "Venezuela",
            "iata": "MRD",
            "airport": "Alberto Carnevalli Airport"
          },
          {
            "label": "Meridian, US (MEI)",
            "city": "Meridian",
            "country": "US",
            "iata": "MEI",
            "airport": "Key Field",
            "currency_code": "USD"
          },
          {
            "label": "Merimbula, Australia (MIM)",
            "city": "Merimbula",
            "country": "Australia",
            "iata": "MIM",
            "airport": "Merimbula Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Mesa, US (AZA)",
            "city": "Mesa",
            "country": "US",
            "iata": "AZA",
            "airport": "Phoenix-Mesa-Gateway Airport",
            "currency_code": "USD"
          },
          {
            "label": "Metz/Nancy, France (ETZ)",
            "city": "Metz/Nancy",
            "country": "France",
            "iata": "ETZ",
            "airport": "Metz-Nancy-Lorraine Airport"
          },
          {
            "label": "Mexicali, Mexico (MXL)",
            "city": "Mexicali",
            "country": "Mexico",
            "iata": "MXL",
            "airport": ""
          },
          {
            "label": "Mian Yang, China (MIG)",
            "city": "Mian Yang",
            "country": "China",
            "iata": "MIG",
            "airport": "Mianyang Airport"
          },
          {
            "label": "Midland, US (MAF)",
            "city": "Midland",
            "country": "US",
            "iata": "MAF",
            "airport": "Midland International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Mikonos, Greece (JMK)",
            "city": "Mikonos",
            "country": "Greece",
            "iata": "JMK",
            "airport": "Mikonos Airport"
          },
          {
            "label": "Mildura, Australia (MQL)",
            "city": "Mildura",
            "country": "Australia",
            "iata": "MQL",
            "airport": "Mildura Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Miles City, US (MLS)",
            "city": "Miles City",
            "country": "US",
            "iata": "MLS",
            "airport": "Frank Wiley Field",
            "currency_code": "USD"
          },
          {
            "label": "Milingimbi, Australia (MGT)",
            "city": "Milingimbi",
            "country": "Australia",
            "iata": "MGT",
            "airport": "Milingimbi Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Milos, Greece (MLO)",
            "city": "Milos",
            "country": "Greece",
            "iata": "MLO",
            "airport": "Milos Airport"
          },
          {
            "label": "Milwaukee, US (MKE)",
            "city": "Milwaukee",
            "country": "US",
            "iata": "MKE",
            "airport": "General Mitchell International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Minatitlan, Mexico (MTT)",
            "city": "Minatitlan",
            "country": "Mexico",
            "iata": "MTT",
            "airport": ""
          },
          {
            "label": "Mineralnye Vody, Russia (MRV)",
            "city": "Mineralnye Vody",
            "country": "Russia",
            "iata": "MRV",
            "airport": "Mineralnyye Vody Airport"
          },
          {
            "label": "Minot, US (MOT)",
            "city": "Minot",
            "country": "US",
            "iata": "MOT",
            "airport": "Minot International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Minsk, Belarus (MHP)",
            "city": "Minsk",
            "country": "Belarus",
            "iata": "MHP",
            "airport": "Minsk 1 Airport"
          },
          {
            "label": "Minsk, Belarus (MSQ)",
            "city": "Minsk",
            "country": "Belarus",
            "iata": "MSQ",
            "airport": "Minsk International Airport"
          },
          {
            "label": "Miri, Malaysia (MYY)",
            "city": "Miri",
            "country": "Malaysia",
            "iata": "MYY",
            "airport": "Miri Airport"
          },
          {
            "label": "Mirnyj, Russia (MJZ)",
            "city": "Mirnyj",
            "country": "Russia",
            "iata": "MJZ",
            "airport": "Mirny Airport"
          },
          {
            "label": "Misawa, Japan (MSJ)",
            "city": "Misawa",
            "country": "Japan",
            "iata": "MSJ",
            "airport": "Misawa Air Base",
            "currency_code": "JPY"
          },
          {
            "label": "Misima Island, Papua New Guinea (MIS)",
            "city": "Misima Island",
            "country": "Papua New Guinea",
            "iata": "MIS",
            "airport": "Misima Island Airport"
          },
          {
            "label": "Missoula, US (MSO)",
            "city": "Missoula",
            "country": "US",
            "iata": "MSO",
            "airport": "Missoula International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Mitiaro Island, Cook Islands (MOI)",
            "city": "Mitiaro Island",
            "country": "Cook Islands",
            "iata": "MOI",
            "airport": "Mitiaro Island Airport"
          },
          {
            "label": "Mitu, Colombia (MVP)",
            "city": "Mitu",
            "country": "Colombia",
            "iata": "MVP",
            "airport": "Fabio Alberto Leon Bentley Airport",
            "currency_code": "COP"
          },
          {
            "label": "Miyake Jima, Japan (MYE)",
            "city": "Miyake Jima",
            "country": "Japan",
            "iata": "MYE",
            "airport": "Miyakejima Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Miyako Jima, Japan (MMY)",
            "city": "Miyako Jima",
            "country": "Japan",
            "iata": "MMY",
            "airport": "Miyako Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Miyazaki, Japan (KMI)",
            "city": "Miyazaki",
            "country": "Japan",
            "iata": "KMI",
            "airport": "Miyazaki Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Mmabatho, South Africa (MBD)",
            "city": "Mmabatho",
            "country": "South Africa",
            "iata": "MBD",
            "airport": "Mmabatho International Airport"
          },
          {
            "label": "Mo i Rana, Norway (MQN)",
            "city": "Mo i Rana",
            "country": "Norway",
            "iata": "MQN",
            "airport": ""
          },
          {
            "label": "Moala, Fiji (MFJ)",
            "city": "Moala",
            "country": "Fiji",
            "iata": "MFJ",
            "airport": "Moala Airport"
          },
          {
            "label": "Mobile, US (MOB)",
            "city": "Mobile",
            "country": "US",
            "iata": "MOB",
            "airport": "Mobile Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Modesto, US (MOD)",
            "city": "Modesto",
            "country": "US",
            "iata": "MOD",
            "airport": "Modesto City Co-Harry Sham Field",
            "currency_code": "USD"
          },
          {
            "label": "Moheli, Comoros (NWA)",
            "city": "Moheli",
            "country": "Comoros",
            "iata": "NWA",
            "airport": ""
          },
          {
            "label": "Molde, Norway (MOL)",
            "city": "Molde",
            "country": "Norway",
            "iata": "MOL",
            "airport": "Molde Airport"
          },
          {
            "label": "Moline, US (MLI)",
            "city": "Moline",
            "country": "US",
            "iata": "MLI",
            "airport": "Quad City International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Mombasa, Kenya (MBA)",
            "city": "Mombasa",
            "country": "Kenya",
            "iata": "MBA",
            "airport": "Mombasa Moi International Airport"
          },
          {
            "label": "Monastir, Tunisia (MIR)",
            "city": "Monastir",
            "country": "Tunisia",
            "iata": "MIR",
            "airport": "Monastir Habib Bourguiba International Airport"
          },
          {
            "label": "Monbetsu, Japan (MBE)",
            "city": "Monbetsu",
            "country": "Japan",
            "iata": "MBE",
            "airport": "Monbetsu Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Monclova, Mexico (LOV)",
            "city": "Monclova",
            "country": "Mexico",
            "iata": "LOV",
            "airport": "Monclova International Airport"
          },
          {
            "label": "Moncton, Canada (YQM)",
            "city": "Moncton",
            "country": "Canada",
            "iata": "YQM",
            "airport": "Greater Moncton International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Mono, Solomon Islands (MNY)",
            "city": "Mono",
            "country": "Solomon Islands",
            "iata": "MNY",
            "airport": "Mono Airport"
          },
          {
            "label": "Monroe, US (MLU)",
            "city": "Monroe",
            "country": "US",
            "iata": "MLU",
            "airport": "Monroe Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Monrovia, Liberia (MLW)",
            "city": "Monrovia",
            "country": "Liberia",
            "iata": "MLW",
            "airport": "Spriggs Payne Airport"
          },
          {
            "label": "Monrovia, Liberia (ROB)",
            "city": "Monrovia",
            "country": "Liberia",
            "iata": "ROB",
            "airport": "Roberts International Airport"
          },
          {
            "label": "Mont Joli, Canada (YYY)",
            "city": "Mont Joli",
            "country": "Canada",
            "iata": "YYY",
            "airport": "Mont Joli Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Mont Tremblant, Canada (YTM)",
            "city": "Mont Tremblant",
            "country": "Canada",
            "iata": "YTM",
            "airport": "La Macaza / Mont-Tremblant International Inc Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Montego Bay, Jamaica (MBJ)",
            "city": "Montego Bay",
            "country": "Jamaica",
            "iata": "MBJ",
            "airport": "Sangster International Airport",
            "currency_code": "JMD"
          },
          {
            "label": "Monteria, Colombia (MTR)",
            "city": "Monteria",
            "country": "Colombia",
            "iata": "MTR",
            "airport": "Los Garzones Airport",
            "currency_code": "COP"
          },
          {
            "label": "Monterrey, Mexico (MTY)",
            "city": "Monterrey",
            "country": "Mexico",
            "iata": "MTY",
            "airport": "General Mariano Escobedo International Airport"
          },
          {
            "label": "Montes Claros, Brazil (MOC)",
            "city": "Montes Claros",
            "country": "Brazil",
            "iata": "MOC",
            "airport": ""
          },
          {
            "label": "Montevideo, Uruguay (MVD)",
            "city": "Montevideo",
            "country": "Uruguay",
            "iata": "MVD",
            "airport": "Carrasco International /General C L Berisso Airport"
          },
          {
            "label": "Montgomery, US (MGM)",
            "city": "Montgomery",
            "country": "US",
            "iata": "MGM",
            "airport": "Montgomery Regional (Dannelly Field) Airport",
            "currency_code": "USD"
          },
          {
            "label": "Montpellier, France (MPL)",
            "city": "Montpellier",
            "country": "France",
            "iata": "MPL",
            "airport": ""
          },
          {
            "label": "Montserrat, Montserrat (MNI)",
            "city": "Montserrat",
            "country": "Montserrat",
            "iata": "MNI",
            "airport": "John A. Osborne Airport"
          },
          {
            "label": "Moosonee, Canada (YMO)",
            "city": "Moosonee",
            "country": "Canada",
            "iata": "YMO",
            "airport": "Moosonee Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Mopti, Mali (MZI)",
            "city": "Mopti",
            "country": "Mali",
            "iata": "MZI",
            "airport": "Ambodedjo Airport"
          },
          {
            "label": "Mora, Sweden (MXX)",
            "city": "Mora",
            "country": "Sweden",
            "iata": "MXX",
            "airport": "Mora Airport"
          },
          {
            "label": "Morafenobe, Madagascar (TVA)",
            "city": "Morafenobe",
            "country": "Madagascar",
            "iata": "TVA",
            "airport": "Morafenobe Airport"
          },
          {
            "label": "Moranbah, Australia (MOV)",
            "city": "Moranbah",
            "country": "Australia",
            "iata": "MOV",
            "airport": "Moranbah Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Moree, Australia (MRZ)",
            "city": "Moree",
            "country": "Australia",
            "iata": "MRZ",
            "airport": "Moree Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Morelia, Mexico (MLM)",
            "city": "Morelia",
            "country": "Mexico",
            "iata": "MLM",
            "airport": "General Francisco J. Mujica International Airport"
          },
          {
            "label": "Morgantown, US (MGW)",
            "city": "Morgantown",
            "country": "US",
            "iata": "MGW",
            "airport": "Morgantown Municipal Walter L. Bill Hart Field",
            "currency_code": "USD"
          },
          {
            "label": "Mornington, Australia (ONG)",
            "city": "Mornington",
            "country": "Australia",
            "iata": "ONG",
            "airport": "Mornington Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Moro, Papua New Guinea (MXH)",
            "city": "Moro",
            "country": "Papua New Guinea",
            "iata": "MXH",
            "airport": "Moro Airport"
          },
          {
            "label": "Morombe, Madagascar (MXM)",
            "city": "Morombe",
            "country": "Madagascar",
            "iata": "MXM",
            "airport": "Morombe Airport"
          },
          {
            "label": "Morondava, Madagascar (MOQ)",
            "city": "Morondava",
            "country": "Madagascar",
            "iata": "MOQ",
            "airport": "Morondava Airport"
          },
          {
            "label": "Moroni, Comoros (HAH)",
            "city": "Moroni",
            "country": "Comoros",
            "iata": "HAH",
            "airport": "Prince Said Ibrahim International Airport"
          },
          {
            "label": "Moroni, Comoros (YVA)",
            "city": "Moroni",
            "country": "Comoros",
            "iata": "YVA",
            "airport": "Iconi Airport"
          },
          {
            "label": "Moruya, Australia (MYA)",
            "city": "Moruya",
            "country": "Australia",
            "iata": "MYA",
            "airport": "Moruya Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Mosjoen, Norway (MJF)",
            "city": "Mosjoen",
            "country": "Norway",
            "iata": "MJF",
            "airport": ""
          },
          {
            "label": "Mostar, Bosnia and Herzegovina (OMO)",
            "city": "Mostar",
            "country": "Bosnia and Herzegovina",
            "iata": "OMO",
            "airport": "Mostar International Airport"
          },
          {
            "label": "Mota Lava, Vanuatu (MTV)",
            "city": "Mota Lava",
            "country": "Vanuatu",
            "iata": "MTV",
            "airport": "Mota Lava Airport"
          },
          {
            "label": "Mouila, Gabon (MJL)",
            "city": "Mouila",
            "country": "Gabon",
            "iata": "MJL",
            "airport": "Mouilla Ville Airport"
          },
          {
            "label": "Mount Gambier, Australia (MGB)",
            "city": "Mount Gambier",
            "country": "Australia",
            "iata": "MGB",
            "airport": "Mount Gambier Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Mount Hagen, Papua New Guinea (HGU)",
            "city": "Mount Hagen",
            "country": "Papua New Guinea",
            "iata": "HGU",
            "airport": "Mount Hagen Kagamuga Airport"
          },
          {
            "label": "Mount Isa, Australia (ISA)",
            "city": "Mount Isa",
            "country": "Australia",
            "iata": "ISA",
            "airport": "Mount Isa Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Mount Magnet, Australia (MMG)",
            "city": "Mount Magnet",
            "country": "Australia",
            "iata": "MMG",
            "airport": "Mount Magnet Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Mount Pleasant, Falkland Islands  (MPN)",
            "city": "Mount Pleasant",
            "country": "Falkland Islands ",
            "iata": "MPN",
            "airport": "Mount Pleasant Airport"
          },
          {
            "label": "Mountain Village, US (MOU)",
            "city": "Mountain Village",
            "country": "US",
            "iata": "MOU",
            "airport": "Mountain Village Airport",
            "currency_code": "USD"
          },
          {
            "label": "Moyo, Uganda (OYG)",
            "city": "Moyo",
            "country": "Uganda",
            "iata": "OYG",
            "airport": "Moyo Airport"
          },
          {
            "label": "Mpacha, Namibia (MPA)",
            "city": "Mpacha",
            "country": "Namibia",
            "iata": "MPA",
            "airport": "Katima Mulilo Airport"
          },
          {
            "label": "Mtwara, Tanzania (MYW)",
            "city": "Mtwara",
            "country": "Tanzania",
            "iata": "MYW",
            "airport": "Mtwara Airport"
          },
          {
            "label": "Mucuri, Brazil (MVS)",
            "city": "Mucuri",
            "country": "Brazil",
            "iata": "MVS",
            "airport": "Mucuri Airport"
          },
          {
            "label": "Mudanjiang, China (MDG)",
            "city": "Mudanjiang",
            "country": "China",
            "iata": "MDG",
            "airport": "Mudanjiang Hailang International Airport"
          },
          {
            "label": "Muenster, Germany (FMO)",
            "city": "Muenster",
            "country": "Germany",
            "iata": "FMO",
            "airport": "Muenster Osnabrueck Airport"
          },
          {
            "label": "Mukah, Malaysia (MKM)",
            "city": "Mukah",
            "country": "Malaysia",
            "iata": "MKM",
            "airport": "Mukah Airport"
          },
          {
            "label": "Mulu, Malaysia (MZV)",
            "city": "Mulu",
            "country": "Malaysia",
            "iata": "MZV",
            "airport": "Mulu Airport"
          },
          {
            "label": "Munda, Solomon Islands (MUA)",
            "city": "Munda",
            "country": "Solomon Islands",
            "iata": "MUA",
            "airport": "Munda Airport"
          },
          {
            "label": "Murcia, Spain (MJV)",
            "city": "Murcia",
            "country": "Spain",
            "iata": "MJV",
            "airport": "San Javier Airport"
          },
          {
            "label": "Murmansk, Russia (MMK)",
            "city": "Murmansk",
            "country": "Russia",
            "iata": "MMK",
            "airport": "Murmansk Airport"
          },
          {
            "label": "Murray Island, Australia (MYI)",
            "city": "Murray Island",
            "country": "Australia",
            "iata": "MYI",
            "airport": "Murray Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Mus, Turkey (MSR)",
            "city": "Mus",
            "country": "Turkey",
            "iata": "MSR",
            "airport": "Mus Airport"
          },
          {
            "label": "Muskegon, US (MKG)",
            "city": "Muskegon",
            "country": "US",
            "iata": "MKG",
            "airport": "Muskegon County Airport",
            "currency_code": "USD"
          },
          {
            "label": "Muskrat Dam, Canada (MSA)",
            "city": "Muskrat Dam",
            "country": "Canada",
            "iata": "MSA",
            "airport": "Muskrat Dam Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Musoma, Tanzania (MUZ)",
            "city": "Musoma",
            "country": "Tanzania",
            "iata": "MUZ",
            "airport": "Musoma Airport"
          },
          {
            "label": "Mwanza, Tanzania (MWZ)",
            "city": "Mwanza",
            "country": "Tanzania",
            "iata": "MWZ",
            "airport": "Mwanza Airport"
          },
          {
            "label": "Myrtle Beach, US - All Airports (MYR)",
            "city": "Myrtle Beach",
            "country": "US",
            "iata": "MYR",
            "airport": "Myrtle Beach International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Mytilene, Greece (MJT)",
            "city": "Mytilene",
            "country": "Greece",
            "iata": "MJT",
            "airport": "Mytilene International Airport"
          },
          {
            "label": "Mzuzu, Malawi (ZZU)",
            "city": "Mzuzu",
            "country": "Malawi",
            "iata": "ZZU",
            "airport": "Mzuzu Airport"
          },
          {
            "label": "Naberezhnye Chelny, Russia (NBC)",
            "city": "Naberezhnye Chelny",
            "country": "Russia",
            "iata": "NBC",
            "airport": "Begishevo Airport"
          },
          {
            "label": "Nador, Morocco (NDR)",
            "city": "Nador",
            "country": "Morocco",
            "iata": "NDR",
            "airport": "Nador International Airport"
          },
          {
            "label": "Nadym, Russia (NYM)",
            "city": "Nadym",
            "country": "Russia",
            "iata": "NYM",
            "airport": "Nadym Airport"
          },
          {
            "label": "Naga City, Philippines (WNP)",
            "city": "Naga City",
            "country": "Philippines",
            "iata": "WNP",
            "airport": "Naga Airport"
          },
          {
            "label": "Nagasaki, Japan (NGS)",
            "city": "Nagasaki",
            "country": "Japan",
            "iata": "NGS",
            "airport": "Nagasaki Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Nagoya, Japan (NGO)",
            "city": "Nagoya",
            "country": "Japan",
            "iata": "NGO",
            "airport": "Chubu Centrair International Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Nain, Canada (YDP)",
            "city": "Nain",
            "country": "Canada",
            "iata": "YDP",
            "airport": "Nain Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Nakashibetsu, Japan (SHB)",
            "city": "Nakashibetsu",
            "country": "Japan",
            "iata": "SHB",
            "airport": "Nakashibetsu Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Nakhichevan, Azerbaijan (NAJ)",
            "city": "Nakhichevan",
            "country": "Azerbaijan",
            "iata": "NAJ",
            "airport": "Nakhchivan Airport"
          },
          {
            "label": "Nakhon Si Thammarat, Thailand (NST)",
            "city": "Nakhon Si Thammarat",
            "country": "Thailand",
            "iata": "NST",
            "airport": "Nakhon Si Thammarat Airport",
            "currency_code": "THB"
          },
          {
            "label": "Nakina, Canada (YQN)",
            "city": "Nakina",
            "country": "Canada",
            "iata": "YQN",
            "airport": "Nakina Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Nakorn Panom, Thailand (KOP)",
            "city": "Nakorn Panom",
            "country": "Thailand",
            "iata": "KOP",
            "airport": "Nakhon Phanom Airport",
            "currency_code": "THB"
          },
          {
            "label": "Namangan, Uzbekistan (NMA)",
            "city": "Namangan",
            "country": "Uzbekistan",
            "iata": "NMA",
            "airport": "Namangan Airport"
          },
          {
            "label": "Nampula, Mozambique (APL)",
            "city": "Nampula",
            "country": "Mozambique",
            "iata": "APL",
            "airport": "Nampula Airport"
          },
          {
            "label": "Namsos, Norway (OSY)",
            "city": "Namsos",
            "country": "Norway",
            "iata": "OSY",
            "airport": ""
          },
          {
            "label": "Nan, Thailand (NNT)",
            "city": "Nan",
            "country": "Thailand",
            "iata": "NNT",
            "airport": "Nan Airport",
            "currency_code": "THB"
          },
          {
            "label": "Nanaimo, Canada (YCD)",
            "city": "Nanaimo",
            "country": "Canada",
            "iata": "YCD",
            "airport": "Nanaimo Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Nanaimo, Canada (ZNA)",
            "city": "Nanaimo",
            "country": "Canada",
            "iata": "ZNA",
            "airport": "Nanaimo Harbour Water Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Nanchang, China (KHN)",
            "city": "Nanchang",
            "country": "China",
            "iata": "KHN",
            "airport": "Nanchang Changbei International Airport"
          },
          {
            "label": "Nanchong, China (NAO)",
            "city": "Nanchong",
            "country": "China",
            "iata": "NAO",
            "airport": "Nanchong Airport"
          },
          {
            "label": "Nangan, Taiwan (LZN)",
            "city": "Nangan",
            "country": "Taiwan",
            "iata": "LZN",
            "airport": "Matsu Nangan Airport"
          },
          {
            "label": "Nanisivik, Canada (YSR)",
            "city": "Nanisivik",
            "country": "Canada",
            "iata": "YSR",
            "airport": "Nanisivik Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Nanking/Nanjing, China (NKG)",
            "city": "Nanking/Nanjing",
            "country": "China",
            "iata": "NKG",
            "airport": "Nanjing Lukou Airport"
          },
          {
            "label": "Nanning, China (NNG)",
            "city": "Nanning",
            "country": "China",
            "iata": "NNG",
            "airport": "Nanning Wuxu Airport"
          },
          {
            "label": "Nanortalik, Greenland (JNN)",
            "city": "Nanortalik",
            "country": "Greenland",
            "iata": "JNN",
            "airport": "Nanortalik Heliport"
          },
          {
            "label": "Nantes, France (NTE)",
            "city": "Nantes",
            "country": "France",
            "iata": "NTE",
            "airport": "Nantes Atlantique Airport"
          },
          {
            "label": "NanTong, China (NTG)",
            "city": "NanTong",
            "country": "China",
            "iata": "NTG",
            "airport": "Nantong Airport"
          },
          {
            "label": "Nantucket, US (ACK)",
            "city": "Nantucket",
            "country": "US",
            "iata": "ACK",
            "airport": "Nantucket Memorial Airport",
            "currency_code": "USD"
          },
          {
            "label": "Nanyang, China (NNY)",
            "city": "Nanyang",
            "country": "China",
            "iata": "NNY",
            "airport": "Nanyang Airport"
          },
          {
            "label": "Nanyuki, Kenya (NYK)",
            "city": "Nanyuki",
            "country": "Kenya",
            "iata": "NYK",
            "airport": "Nanyuki Airport"
          },
          {
            "label": "Napakiak, US (WNA)",
            "city": "Napakiak",
            "country": "US",
            "iata": "WNA",
            "airport": "Napakiak Airport",
            "currency_code": "USD"
          },
          {
            "label": "Napier, New Zealand (NPE)",
            "city": "Napier",
            "country": "New Zealand",
            "iata": "NPE",
            "airport": "Napier Airport"
          },
          {
            "label": "Naples, Italy (NAP)",
            "city": "Naples",
            "country": "Italy",
            "iata": "NAP",
            "airport": "",
            "currency_code": "EUR"
          },
          {
            "label": "Naples, US (APF)",
            "city": "Naples",
            "country": "US",
            "iata": "APF",
            "airport": "Naples Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Narathiwat, Thailand (NAW)",
            "city": "Narathiwat",
            "country": "Thailand",
            "iata": "NAW",
            "airport": "Narathiwat Airport",
            "currency_code": "THB"
          },
          {
            "label": "Narrabri, Australia (NAA)",
            "city": "Narrabri",
            "country": "Australia",
            "iata": "NAA",
            "airport": "Narrabri Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Narrandera, Australia (NRA)",
            "city": "Narrandera",
            "country": "Australia",
            "iata": "NRA",
            "airport": "Narrandera Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Narsarsuaq, Greenland (UAK)",
            "city": "Narsarsuaq",
            "country": "Greenland",
            "iata": "UAK",
            "airport": "Narsarsuaq Airport"
          },
          {
            "label": "Narvik, Norway (NVK)",
            "city": "Narvik",
            "country": "Norway",
            "iata": "NVK",
            "airport": "Narvik Framnes Airport"
          },
          {
            "label": "Naryan-Mar, Russia (NNM)",
            "city": "Naryan-Mar",
            "country": "Russia",
            "iata": "NNM",
            "airport": "Naryan Mar Airport"
          },
          {
            "label": "Nashville, US (BNA)",
            "city": "Nashville",
            "country": "US",
            "iata": "BNA",
            "airport": "Nashville International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Natal, Brazil (NAT)",
            "city": "Natal",
            "country": "Brazil",
            "iata": "NAT",
            "airport": "Augusto Severo Airport"
          },
          {
            "label": "Natashquan, Canada (YNA)",
            "city": "Natashquan",
            "country": "Canada",
            "iata": "YNA",
            "airport": "Natashquan Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Nauru Island, Nauru (INU)",
            "city": "Nauru Island",
            "country": "Nauru",
            "iata": "INU",
            "airport": "Nauru International Airport"
          },
          {
            "label": "Navegantes, Brazil (NVT)",
            "city": "Navegantes",
            "country": "Brazil",
            "iata": "NVT",
            "airport": "Ministro Victor Konder International Airport"
          },
          {
            "label": "Naxos, Greece (JNX)",
            "city": "Naxos",
            "country": "Greece",
            "iata": "JNX",
            "airport": "Naxos Airport"
          },
          {
            "label": "Ndjamena, Chad (NDJ)",
            "city": "Ndjamena",
            "country": "Chad",
            "iata": "NDJ",
            "airport": "N'Djamena International Airport"
          },
          {
            "label": "Ndola, Zambia (NLA)",
            "city": "Ndola",
            "country": "Zambia",
            "iata": "NLA",
            "airport": "Ndola Airport"
          },
          {
            "label": "Neerlerit Inaat, Greenland (CNP)",
            "city": "Neerlerit Inaat",
            "country": "Greenland",
            "iata": "CNP",
            "airport": "Neerlerit Inaat Airport"
          },
          {
            "label": "Neiva, Colombia (NVA)",
            "city": "Neiva",
            "country": "Colombia",
            "iata": "NVA",
            "airport": "Benito Salas Airport",
            "currency_code": "COP"
          },
          {
            "label": "Nejran, Saudi Arabia (EAM)",
            "city": "Nejran",
            "country": "Saudi Arabia",
            "iata": "EAM",
            "airport": "Nejran Airport"
          },
          {
            "label": "Nelson, New Zealand (NSN)",
            "city": "Nelson",
            "country": "New Zealand",
            "iata": "NSN",
            "airport": "Nelson Airport"
          },
          {
            "label": "Nelspruit, South Africa (MQP)",
            "city": "Nelspruit",
            "country": "South Africa",
            "iata": "MQP",
            "airport": "Kruger Mpumalanga International Airport"
          },
          {
            "label": "Nemiscau, Canada (YNS)",
            "city": "Nemiscau",
            "country": "Canada",
            "iata": "YNS",
            "airport": "Nemiscau Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Nepalganj, Nepal (KEP)",
            "city": "Nepalganj",
            "country": "Nepal",
            "iata": "KEP",
            "airport": "Nepalgunj Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Neumuenster, Germany (EUM)",
            "city": "Neumuenster",
            "country": "Germany",
            "iata": "EUM",
            "airport": ""
          },
          {
            "label": "Neuquen, Argentina (NQN)",
            "city": "Neuquen",
            "country": "Argentina",
            "iata": "NQN",
            "airport": "Presidente Peron Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Nevsehir, Turkey (NAV)",
            "city": "Nevsehir",
            "country": "Turkey",
            "iata": "NAV",
            "airport": "Nevsehir Kapadokya International Airport"
          },
          {
            "label": "New Bern, US (EWN)",
            "city": "New Bern",
            "country": "US",
            "iata": "EWN",
            "airport": "Coastal Carolina Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "New Haven, US (HVN)",
            "city": "New Haven",
            "country": "US",
            "iata": "HVN",
            "airport": "Tweed New Haven Airport",
            "currency_code": "USD"
          },
          {
            "label": "New Orleans, US (MSY)",
            "city": "New Orleans",
            "country": "US",
            "iata": "MSY",
            "airport": "Louis Armstrong New Orleans International Airport",
            "currency_code": "USD"
          },
          {
            "label": "New Plymouth, New Zealand (NPL)",
            "city": "New Plymouth",
            "country": "New Zealand",
            "iata": "NPL",
            "airport": "New Plymouth Airport"
          },
          {
            "label": "New Stuyahok, US (KNW)",
            "city": "New Stuyahok",
            "country": "US",
            "iata": "KNW",
            "airport": "New Stuyahok Airport",
            "currency_code": "USD"
          },
          {
            "label": "Newburgh, US (SWF)",
            "city": "Newburgh",
            "country": "US",
            "iata": "SWF",
            "airport": "Stewart International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Newman, Australia (ZNE)",
            "city": "Newman",
            "country": "Australia",
            "iata": "ZNE",
            "airport": "Newman Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Newquay, UK (NQY)",
            "city": "Newquay",
            "country": "UK",
            "iata": "NQY",
            "airport": "Newquay Cornwall Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Newtok, US (WWT)",
            "city": "Newtok",
            "country": "US",
            "iata": "WWT",
            "airport": "Newtok Seaplane Base",
            "currency_code": "USD"
          },
          {
            "label": "Ngau Island, Fiji (NGI)",
            "city": "Ngau Island",
            "country": "Fiji",
            "iata": "NGI",
            "airport": "Ngau Airport"
          },
          {
            "label": "Nha Trang, Vietnam (NHA)",
            "city": "Nha Trang",
            "country": "Vietnam",
            "iata": "NHA",
            "airport": "Nha Trang Air Base"
          },
          {
            "label": "Niagara Falls, US (IAG)",
            "city": "Niagara Falls",
            "country": "US",
            "iata": "IAG",
            "airport": "Niagara Falls International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Niigata, Japan (KIJ)",
            "city": "Niigata",
            "country": "Japan",
            "iata": "KIJ",
            "airport": "Niigata Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Nikolaev, Ukraine (NLV)",
            "city": "Nikolaev",
            "country": "Ukraine",
            "iata": "NLV",
            "airport": "Mykolaiv International Airport"
          },
          {
            "label": "Nikolski, US (IKO)",
            "city": "Nikolski",
            "country": "US",
            "iata": "IKO",
            "airport": "Nikolski Air Station",
            "currency_code": "USD"
          },
          {
            "label": "Ningbo, China (NGB)",
            "city": "Ningbo",
            "country": "China",
            "iata": "NGB",
            "airport": "Ningbo Lishe International Airport"
          },
          {
            "label": "Nis, Serbia (INI)",
            "city": "Nis",
            "country": "Serbia",
            "iata": "INI",
            "airport": "Nis Airport"
          },
          {
            "label": "Nissan Island, Papua New Guinea (IIS)",
            "city": "Nissan Island",
            "country": "Papua New Guinea",
            "iata": "IIS",
            "airport": "Nissan Island Airport"
          },
          {
            "label": "Niuafo'ou, Tonga (NFO)",
            "city": "Niuafo'ou",
            "country": "Tonga",
            "iata": "NFO",
            "airport": "Mata'aho Airport"
          },
          {
            "label": "Niuatoputapu, Tonga (NTT)",
            "city": "Niuatoputapu",
            "country": "Tonga",
            "iata": "NTT",
            "airport": "Kuini Lavenia Airport"
          },
          {
            "label": "Niue Island, Niue (IUE)",
            "city": "Niue Island",
            "country": "Niue",
            "iata": "IUE",
            "airport": "Niue International Airport"
          },
          {
            "label": "Nizhnevartovsk, Russia (NJC)",
            "city": "Nizhnevartovsk",
            "country": "Russia",
            "iata": "NJC",
            "airport": "Nizhnevartovsk Airport"
          },
          {
            "label": "Nizhniy Novgorod, Russia (GOJ)",
            "city": "Nizhniy Novgorod",
            "country": "Russia",
            "iata": "GOJ",
            "airport": "Nizhny Novgorod International Airport"
          },
          {
            "label": "Noatak, US (WTK)",
            "city": "Noatak",
            "country": "US",
            "iata": "WTK",
            "airport": "Noatak Airport",
            "currency_code": "USD"
          },
          {
            "label": "Nojabrxsk, Russia (NOJ)",
            "city": "Nojabrxsk",
            "country": "Russia",
            "iata": "NOJ",
            "airport": "Noyabrsk Airport"
          },
          {
            "label": "Nome, US (OME)",
            "city": "Nome",
            "country": "US",
            "iata": "OME",
            "airport": "Nome Airport",
            "currency_code": "USD"
          },
          {
            "label": "Norfolk Island, Norfolk Island (NLK)",
            "city": "Norfolk Island",
            "country": "Norfolk Island",
            "iata": "NLK",
            "airport": "Norfolk Island International Airport"
          },
          {
            "label": "Norfolk, US (ORF)",
            "city": "Norfolk",
            "country": "US",
            "iata": "ORF",
            "airport": "Norfolk International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Noril'sk, Russia (NSK)",
            "city": "Noril'sk",
            "country": "Russia",
            "iata": "NSK",
            "airport": "Norilsk-Alykel Airport"
          },
          {
            "label": "Norman Wells, Canada (YVQ)",
            "city": "Norman Wells",
            "country": "Canada",
            "iata": "YVQ",
            "airport": "Norman Wells Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Normanton, Australia (NTN)",
            "city": "Normanton",
            "country": "Australia",
            "iata": "NTN",
            "airport": "Normanton Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Norrkoping, Sweden (NRK)",
            "city": "Norrkoping",
            "country": "Sweden",
            "iata": "NRK",
            "airport": ""
          },
          {
            "label": "Norsup, Vanuatu (NUS)",
            "city": "Norsup",
            "country": "Vanuatu",
            "iata": "NUS",
            "airport": "Nuussuaq Heliport"
          },
          {
            "label": "North Bay, Canada (YYB)",
            "city": "North Bay",
            "country": "Canada",
            "iata": "YYB",
            "airport": "North Bay Airport",
            "currency_code": "CAD"
          },
          {
            "label": "North Bend, US (OTH)",
            "city": "North Bend",
            "country": "US",
            "iata": "OTH",
            "airport": "Southwest Oregon Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "North Platte, US (LBF)",
            "city": "North Platte",
            "country": "US",
            "iata": "LBF",
            "airport": "North Platte Regional Airport Lee Bird Field",
            "currency_code": "USD"
          },
          {
            "label": "North Spirit Lake, Canada (YNO)",
            "city": "North Spirit Lake",
            "country": "Canada",
            "iata": "YNO",
            "airport": "North Spirit Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Northampton, UK (ORM)",
            "city": "Northampton",
            "country": "UK",
            "iata": "ORM",
            "airport": "Sywell Aerodrome",
            "currency_code": "GBP"
          },
          {
            "label": "Norway House, Canada (YNE)",
            "city": "Norway House",
            "country": "Canada",
            "iata": "YNE",
            "airport": "Norway House Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Norwich, UK (NWI)",
            "city": "Norwich",
            "country": "UK",
            "iata": "NWI",
            "airport": "Norwich International Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Nossi-be, Madagascar (NOS)",
            "city": "Nossi-be",
            "country": "Madagascar",
            "iata": "NOS",
            "airport": "Fascene Airport"
          },
          {
            "label": "Nottingham, UK (EMA)",
            "city": "Nottingham",
            "country": "UK",
            "iata": "EMA",
            "airport": "East Midlands Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Nouadhibou, Mauritania (NDB)",
            "city": "Nouadhibou",
            "country": "Mauritania",
            "iata": "NDB",
            "airport": "Nouadhibou International Airport"
          },
          {
            "label": "Nouakchott, Mauritania (NKC)",
            "city": "Nouakchott",
            "country": "Mauritania",
            "iata": "NKC",
            "airport": "Nouakchott International Airport"
          },
          {
            "label": "Noumea, New Caledonia (GEA)",
            "city": "Noumea",
            "country": "New Caledonia",
            "iata": "GEA",
            "airport": ""
          },
          {
            "label": "Noumea, New Caledonia (NOU)",
            "city": "Noumea",
            "country": "New Caledonia",
            "iata": "NOU",
            "airport": "La Tontouta International Airport"
          },
          {
            "label": "Novokuznetsk, Russia (NOZ)",
            "city": "Novokuznetsk",
            "country": "Russia",
            "iata": "NOZ",
            "airport": "Spichenkovo Airport"
          },
          {
            "label": "Novosibirsk, Russia (OVB)",
            "city": "Novosibirsk",
            "country": "Russia",
            "iata": "OVB",
            "airport": "Tolmachevo Airport"
          },
          {
            "label": "Novy Urengoy, Russia (NUX)",
            "city": "Novy Urengoy",
            "country": "Russia",
            "iata": "NUX",
            "airport": "Novy Urengoy Airport"
          },
          {
            "label": "Nuevo Laredo, Mexico (NLD)",
            "city": "Nuevo Laredo",
            "country": "Mexico",
            "iata": "NLD",
            "airport": ""
          },
          {
            "label": "Nuiqsut, US (NUI)",
            "city": "Nuiqsut",
            "country": "US",
            "iata": "NUI",
            "airport": "Nuiqsut Airport",
            "currency_code": "USD"
          },
          {
            "label": "Nuku'Alofa, Tonga (TBU)",
            "city": "Nuku'Alofa",
            "country": "Tonga",
            "iata": "TBU",
            "airport": "Fua'amotu International Airport"
          },
          {
            "label": "Nukus, Uzbekistan (NCU)",
            "city": "Nukus",
            "country": "Uzbekistan",
            "iata": "NCU",
            "airport": "Nukus Airport"
          },
          {
            "label": "Nuqui, Colombia (NQU)",
            "city": "Nuqui",
            "country": "Colombia",
            "iata": "NQU",
            "airport": "Reyes Murillo Airport",
            "currency_code": "COP"
          },
          {
            "label": "Nuremberg, Germany (NUE)",
            "city": "Nuremberg",
            "country": "Germany",
            "iata": "NUE",
            "airport": "Nuremberg Airport"
          },
          {
            "label": "Nuuk, Greenland (GOH)",
            "city": "Nuuk",
            "country": "Greenland",
            "iata": "GOH",
            "airport": "Godthaab / Nuuk Airport"
          },
          {
            "label": "Oakey, Australia (OKY)",
            "city": "Oakey",
            "country": "Australia",
            "iata": "OKY",
            "airport": "Oakey Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Oakland, US (OAK)",
            "city": "Oakland",
            "country": "US",
            "iata": "OAK",
            "airport": "Metropolitan Oakland International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Oamaru, New Zealand (OAM)",
            "city": "Oamaru",
            "country": "New Zealand",
            "iata": "OAM",
            "airport": "Oamaru Airport"
          },
          {
            "label": "Oaxaca, Mexico (OAX)",
            "city": "Oaxaca",
            "country": "Mexico",
            "iata": "OAX",
            "airport": ""
          },
          {
            "label": "Obihiro, Japan (OBO)",
            "city": "Obihiro",
            "country": "Japan",
            "iata": "OBO",
            "airport": "Tokachi-Obihiro Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Obo, Papua New Guinea (OBX)",
            "city": "Obo",
            "country": "Papua New Guinea",
            "iata": "OBX",
            "airport": "Obo Airport"
          },
          {
            "label": "Odate Noshiro, Japan (ONJ)",
            "city": "Odate Noshiro",
            "country": "Japan",
            "iata": "ONJ",
            "airport": "Odate Noshiro Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Ogoki, Canada (YOG)",
            "city": "Ogoki",
            "country": "Canada",
            "iata": "YOG",
            "airport": "Ogoki Post Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Ohrid, Macedonia (OHD)",
            "city": "Ohrid",
            "country": "Macedonia",
            "iata": "OHD",
            "airport": "Ohrid St. Paul the Apostle Airport"
          },
          {
            "label": "Oita, Japan (OIT)",
            "city": "Oita",
            "country": "Japan",
            "iata": "OIT",
            "airport": "Oita Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Okayama, Japan (OKJ)",
            "city": "Okayama",
            "country": "Japan",
            "iata": "OKJ",
            "airport": "Okayama Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Okhotsk, Russia (OHO)",
            "city": "Okhotsk",
            "country": "Russia",
            "iata": "OHO",
            "airport": "Okhotsk Airport"
          },
          {
            "label": "Okinawa, Japan (OKA)",
            "city": "Okinawa",
            "country": "Japan",
            "iata": "OKA",
            "airport": "Naha Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Oklahoma City, US (OKC)",
            "city": "Oklahoma City",
            "country": "US",
            "iata": "OKC",
            "airport": "Will Rogers World Airport",
            "currency_code": "USD"
          },
          {
            "label": "Olbia, Italy (OLB)",
            "city": "Olbia",
            "country": "Italy",
            "iata": "OLB",
            "airport": "Olbia / Costa Smeralda Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Old Crow, Canada (YOC)",
            "city": "Old Crow",
            "country": "Canada",
            "iata": "YOC",
            "airport": "Old Crow Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Olpoi, Vanuatu (OLJ)",
            "city": "Olpoi",
            "country": "Vanuatu",
            "iata": "OLJ",
            "airport": "North West Santo Airport"
          },
          {
            "label": "Olympic Dam, Australia (OLP)",
            "city": "Olympic Dam",
            "country": "Australia",
            "iata": "OLP",
            "airport": "Olympic Dam Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Omaha, US (OMA)",
            "city": "Omaha",
            "country": "US",
            "iata": "OMA",
            "airport": "Eppley Airfield",
            "currency_code": "USD"
          },
          {
            "label": "Omboue, Gabon (OMB)",
            "city": "Omboue",
            "country": "Gabon",
            "iata": "OMB",
            "airport": "Omboue Hopital Airport"
          },
          {
            "label": "Omsk, Russia (OMS)",
            "city": "Omsk",
            "country": "Russia",
            "iata": "OMS",
            "airport": "Omsk Central Airport"
          },
          {
            "label": "Ondangwa, Namibia (OND)",
            "city": "Ondangwa",
            "country": "Namibia",
            "iata": "OND",
            "airport": "Ondangwa Airport"
          },
          {
            "label": "Ontario, US (ONT)",
            "city": "Ontario",
            "country": "US",
            "iata": "ONT",
            "airport": "Ontario International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Oradea, Romania (OMR)",
            "city": "Oradea",
            "country": "Romania",
            "iata": "OMR",
            "airport": "Oradea International Airport",
            "currency_code": "RON"
          },
          {
            "label": "Orange, Australia (OAG)",
            "city": "Orange",
            "country": "Australia",
            "iata": "OAG",
            "airport": "Orange Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Oranjemund, Namibia (OMD)",
            "city": "Oranjemund",
            "country": "Namibia",
            "iata": "OMD",
            "airport": "Oranjemund Airport"
          },
          {
            "label": "Orebro, Sweden (ORB)",
            "city": "Orebro",
            "country": "Sweden",
            "iata": "ORB",
            "airport": ""
          },
          {
            "label": "Orenburg, Russia (REN)",
            "city": "Orenburg",
            "country": "Russia",
            "iata": "REN",
            "airport": "Orenburg Central Airport"
          },
          {
            "label": "Orland, Norway (OLA)",
            "city": "Orland",
            "country": "Norway",
            "iata": "OLA",
            "airport": ""
          },
          {
            "label": "Ornskoldsvik, Sweden (OER)",
            "city": "Ornskoldsvik",
            "country": "Sweden",
            "iata": "OER",
            "airport": ""
          },
          {
            "label": "Orsk, Russia (OSW)",
            "city": "Orsk",
            "country": "Russia",
            "iata": "OSW",
            "airport": "Orsk Airport"
          },
          {
            "label": "Orsta-Volda, Norway (HOV)",
            "city": "Orsta-Volda",
            "country": "Norway",
            "iata": "HOV",
            "airport": ""
          },
          {
            "label": "Osh, Kyrgyzstan (OSS)",
            "city": "Osh",
            "country": "Kyrgyzstan",
            "iata": "OSS",
            "airport": "Osh Airport"
          },
          {
            "label": "Oshawa, Canada (YOO)",
            "city": "Oshawa",
            "country": "Canada",
            "iata": "YOO",
            "airport": "Oshawa Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Oshima, Japan (OIM)",
            "city": "Oshima",
            "country": "Japan",
            "iata": "OIM",
            "airport": "Oshima Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Osijek, Croatia (OSI)",
            "city": "Osijek",
            "country": "Croatia",
            "iata": "OSI",
            "airport": "Osijek Airport"
          },
          {
            "label": "Oskarshamn, Sweden (OSK)",
            "city": "Oskarshamn",
            "country": "Sweden",
            "iata": "OSK",
            "airport": "Oskarshamn Airport"
          },
          {
            "label": "Osorno, Chile (ZOS)",
            "city": "Osorno",
            "country": "Chile",
            "iata": "ZOS",
            "airport": ""
          },
          {
            "label": "Ostersund, Sweden (OSD)",
            "city": "Ostersund",
            "country": "Sweden",
            "iata": "OSD",
            "airport": ""
          },
          {
            "label": "Ostrava, Czech Republic (OSR)",
            "city": "Ostrava",
            "country": "Czech Republic",
            "iata": "OSR",
            "airport": ""
          },
          {
            "label": "Ouagadougou, Burkina Faso (OUA)",
            "city": "Ouagadougou",
            "country": "Burkina Faso",
            "iata": "OUA",
            "airport": "Ouagadougou Airport"
          },
          {
            "label": "Ouarzazate, Morocco (OZZ)",
            "city": "Ouarzazate",
            "country": "Morocco",
            "iata": "OZZ",
            "airport": "Ouarzazate Airport"
          },
          {
            "label": "Oudomxay, Laos (ODY)",
            "city": "Oudomxay",
            "country": "Laos",
            "iata": "ODY",
            "airport": "Oudomsay Airport"
          },
          {
            "label": "Oujda, Morocco (OUD)",
            "city": "Oujda",
            "country": "Morocco",
            "iata": "OUD",
            "airport": "Angads Airport"
          },
          {
            "label": "Oulu, Finland (OUL)",
            "city": "Oulu",
            "country": "Finland",
            "iata": "OUL",
            "airport": "Oulu Airport"
          },
          {
            "label": "Ouvea, New Caledonia (UVE)",
            "city": "Ouvea",
            "country": "New Caledonia",
            "iata": "UVE",
            "airport": ""
          },
          {
            "label": "Ovda, Israel (VDA)",
            "city": "Ovda",
            "country": "Israel",
            "iata": "VDA",
            "airport": "Ovda International Airport",
            "currency_code": "ILS"
          },
          {
            "label": "Owensboro, US (OWB)",
            "city": "Owensboro",
            "country": "US",
            "iata": "OWB",
            "airport": "Owensboro Daviess County Airport",
            "currency_code": "USD"
          },
          {
            "label": "Oxford House, Canada (YOH)",
            "city": "Oxford House",
            "country": "Canada",
            "iata": "YOH",
            "airport": "Oxford House Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Oxford, UK (OXF)",
            "city": "Oxford",
            "country": "UK",
            "iata": "OXF",
            "airport": "Oxford (Kidlington) Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Oyem, Gabon (OYE)",
            "city": "Oyem",
            "country": "Gabon",
            "iata": "OYE",
            "airport": "Oyem Airport"
          },
          {
            "label": "Ozamis City, Philippines (OZC)",
            "city": "Ozamis City",
            "country": "Philippines",
            "iata": "OZC",
            "airport": "Labo Airport"
          },
          {
            "label": "Paama, Vanuatu (PBJ)",
            "city": "Paama",
            "country": "Vanuatu",
            "iata": "PBJ",
            "airport": "Tavie Airport"
          },
          {
            "label": "Paamiut, Greenland (JFR)",
            "city": "Paamiut",
            "country": "Greenland",
            "iata": "JFR",
            "airport": "Paamiut Heliport"
          },
          {
            "label": "Padang, Indonesia (PDG)",
            "city": "Padang",
            "country": "Indonesia",
            "iata": "PDG",
            "airport": "Tabing Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Paderborn, Germany (PAD)",
            "city": "Paderborn",
            "country": "Germany",
            "iata": "PAD",
            "airport": "Paderborn Lippstadt Airport"
          },
          {
            "label": "Paducah, US (PAH)",
            "city": "Paducah",
            "country": "US",
            "iata": "PAH",
            "airport": "Barkley Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Pagadian, Philippines (PAG)",
            "city": "Pagadian",
            "country": "Philippines",
            "iata": "PAG",
            "airport": "Pagadian Airport"
          },
          {
            "label": "Pago Pago, American Samoa (PPG)",
            "city": "Pago Pago",
            "country": "American Samoa",
            "iata": "PPG",
            "airport": "Pago Pago International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Pajala, Sweden (PJA)",
            "city": "Pajala",
            "country": "Sweden",
            "iata": "PJA",
            "airport": "Pajala Airport"
          },
          {
            "label": "Pakse, Laos (PKZ)",
            "city": "Pakse",
            "country": "Laos",
            "iata": "PKZ",
            "airport": "Pakse International Airport"
          },
          {
            "label": "Pakuashipi, Canada (YIF)",
            "city": "Pakuashipi",
            "country": "Canada",
            "iata": "YIF",
            "airport": "St Augustin Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Palangkaraya, Indonesia (PKY)",
            "city": "Palangkaraya",
            "country": "Indonesia",
            "iata": "PKY",
            "airport": "Tjilik Riwut Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Palembang, Indonesia (PLM)",
            "city": "Palembang",
            "country": "Indonesia",
            "iata": "PLM",
            "airport": "Sultan Mahmud Badaruddin Ii Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Palermo, Italy (PMO)",
            "city": "Palermo",
            "country": "Italy",
            "iata": "PMO",
            "airport": "Palermo / Punta Raisi Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Palm Island, Australia (PMK)",
            "city": "Palm Island",
            "country": "Australia",
            "iata": "PMK",
            "airport": "Palm Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Palm Springs, US (PSP)",
            "city": "Palm Springs",
            "country": "US",
            "iata": "PSP",
            "airport": "Palm Springs International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Palma de Mallorca, Spain (PMI)",
            "city": "Palma de Mallorca",
            "country": "Spain",
            "iata": "PMI",
            "airport": "Palma De Mallorca Airport"
          },
          {
            "label": "Palmas, Brazil (PMW)",
            "city": "Palmas",
            "country": "Brazil",
            "iata": "PMW",
            "airport": "Brigadeiro Lysias Rodrigues Airport"
          },
          {
            "label": "Palmdale, US (PMD)",
            "city": "Palmdale",
            "country": "US",
            "iata": "PMD",
            "airport": "Palmdale Regional/USAF Plant 42 Airport",
            "currency_code": "USD"
          },
          {
            "label": "Palmerston North, New Zealand (PMR)",
            "city": "Palmerston North",
            "country": "New Zealand",
            "iata": "PMR",
            "airport": "Palmerston North Airport"
          },
          {
            "label": "Palu, Indonesia (PLW)",
            "city": "Palu",
            "country": "Indonesia",
            "iata": "PLW",
            "airport": "Mutiara Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Pamplona, Spain (PNA)",
            "city": "Pamplona",
            "country": "Spain",
            "iata": "PNA",
            "airport": "Pamplona Airport"
          },
          {
            "label": "Panama City, US (PFN)",
            "city": "Panama City",
            "country": "US",
            "iata": "PFN",
            "airport": "Panama City-Bay Co International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Pangkalpinang, Indonesia (PGK)",
            "city": "Pangkalpinang",
            "country": "Indonesia",
            "iata": "PGK",
            "airport": "Pangkal Pinang (Depati Amir) Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Pangkor, Malaysia (PKG)",
            "city": "Pangkor",
            "country": "Malaysia",
            "iata": "PKG",
            "airport": "Pulau Pangkor Airport"
          },
          {
            "label": "Pangnirtung, Canada (YXP)",
            "city": "Pangnirtung",
            "country": "Canada",
            "iata": "YXP",
            "airport": "Pangnirtung Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Pantelleria, Italy (PNL)",
            "city": "Pantelleria",
            "country": "Italy",
            "iata": "PNL",
            "airport": "Pantelleria Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Papeete - Tahiti, French Polynesia (PPT)",
            "city": "Papeete",
            "country": "French Polynesia",
            "iata": "PPT",
            "airport": "Faa'a International Airport"
          },
          {
            "label": "Paphos, Cyprus (PFO)",
            "city": "Paphos",
            "country": "Cyprus",
            "iata": "PFO",
            "airport": "Paphos International Airport"
          },
          {
            "label": "Paraburdoo, Australia (PBO)",
            "city": "Paraburdoo",
            "country": "Australia",
            "iata": "PBO",
            "airport": "Paraburdoo Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Paramaribo, Suriname (PBM)",
            "city": "Paramaribo",
            "country": "Suriname",
            "iata": "PBM",
            "airport": "Johan Adolf Pengel International Airport"
          },
          {
            "label": "Pardubice, Czech Republic (PED)",
            "city": "Pardubice",
            "country": "Czech Republic",
            "iata": "PED",
            "airport": "Pardubice Airport"
          },
          {
            "label": "Parintins, Brazil (PIN)",
            "city": "Parintins",
            "country": "Brazil",
            "iata": "PIN",
            "airport": "Parintins Airport"
          },
          {
            "label": "Parkes, Australia (PKE)",
            "city": "Parkes",
            "country": "Australia",
            "iata": "PKE",
            "airport": "Parkes Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Paros, Greece (PAS)",
            "city": "Paros",
            "country": "Greece",
            "iata": "PAS",
            "airport": "Paros Airport"
          },
          {
            "label": "Pasco, US (PSC)",
            "city": "Pasco",
            "country": "US",
            "iata": "PSC",
            "airport": "Tri Cities Airport",
            "currency_code": "USD"
          },
          {
            "label": "Passo Fundo, Brazil (PFB)",
            "city": "Passo Fundo",
            "country": "Brazil",
            "iata": "PFB",
            "airport": "Lauro Kurtz Airport"
          },
          {
            "label": "Pasto, Colombia (PSO)",
            "city": "Pasto",
            "country": "Colombia",
            "iata": "PSO",
            "airport": "Antonio Narino Airport",
            "currency_code": "COP"
          },
          {
            "label": "Patos De Minas, Brazil (POJ)",
            "city": "Patos De Minas",
            "country": "Brazil",
            "iata": "POJ",
            "airport": "Patos de Minas Airport"
          },
          {
            "label": "Patras, Greece (GPA)",
            "city": "Patras",
            "country": "Greece",
            "iata": "GPA",
            "airport": "Araxos Airport"
          },
          {
            "label": "Pau, France (PUF)",
            "city": "Pau",
            "country": "France",
            "iata": "PUF",
            "airport": ""
          },
          {
            "label": "Paulatuk, Canada (YPC)",
            "city": "Paulatuk",
            "country": "Canada",
            "iata": "YPC",
            "airport": "Paulatuk (Nora Aliqatchialuk Ruben) Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Pavlodar, Kazakhstan (PWQ)",
            "city": "Pavlodar",
            "country": "Kazakhstan",
            "iata": "PWQ",
            "airport": "Pavlodar Airport"
          },
          {
            "label": "Peace River, Canada (YPE)",
            "city": "Peace River",
            "country": "Canada",
            "iata": "YPE",
            "airport": "Peace River Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Peawanuck, Canada (YPO)",
            "city": "Peawanuck",
            "country": "Canada",
            "iata": "YPO",
            "airport": "Peawanuck Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Pechora, Russia (PEX)",
            "city": "Pechora",
            "country": "Russia",
            "iata": "PEX",
            "airport": "Pechora Airport"
          },
          {
            "label": "Pekanbaru, Indonesia (PKU)",
            "city": "Pekanbaru",
            "country": "Indonesia",
            "iata": "PKU",
            "airport": "Sultan Syarif Kasim Ii (Simpang Tiga) Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Pellston, US (PLN)",
            "city": "Pellston",
            "country": "US",
            "iata": "PLN",
            "airport": "Pellston Regional Airport of Emmet County Airport",
            "currency_code": "USD"
          },
          {
            "label": "Pelotas, Brazil (PET)",
            "city": "Pelotas",
            "country": "Brazil",
            "iata": "PET",
            "airport": "Pelotas Airport"
          },
          {
            "label": "Pemba, Mozambique (POL)",
            "city": "Pemba",
            "country": "Mozambique",
            "iata": "POL",
            "airport": "Pemba Airport"
          },
          {
            "label": "Penang, Malaysia (PEN)",
            "city": "Penang",
            "country": "Malaysia",
            "iata": "PEN",
            "airport": "Penang International Airport"
          },
          {
            "label": "Pensacola, US (PNS)",
            "city": "Pensacola",
            "country": "US",
            "iata": "PNS",
            "airport": "Pensacola Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Penticton, Canada (YYF)",
            "city": "Penticton",
            "country": "Canada",
            "iata": "YYF",
            "airport": "Penticton Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Penzance, UK (PZE)",
            "city": "Penzance",
            "country": "UK",
            "iata": "PZE",
            "airport": "Penzance Heliport",
            "currency_code": "GBP"
          },
          {
            "label": "Peoria, US (PIA)",
            "city": "Peoria",
            "country": "US",
            "iata": "PIA",
            "airport": "Greater Peoria Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Pereira, Colombia (PEI)",
            "city": "Pereira",
            "country": "Colombia",
            "iata": "PEI",
            "airport": "",
            "currency_code": "COP"
          },
          {
            "label": "Perm, Russia (PEE)",
            "city": "Perm",
            "country": "Russia",
            "iata": "PEE",
            "airport": "Bolshoye Savino Airport"
          },
          {
            "label": "Perpignan, France (PGF)",
            "city": "Perpignan",
            "country": "France",
            "iata": "PGF",
            "airport": ""
          },
          {
            "label": "Perugia, Italy (PEG)",
            "city": "Perugia",
            "country": "Italy",
            "iata": "PEG",
            "airport": "Perugia / San Egidio Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Pescara, Italy (PSR)",
            "city": "Pescara",
            "country": "Italy",
            "iata": "PSR",
            "airport": "Pescara International Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Petersburg, US (PSG)",
            "city": "Petersburg",
            "country": "US",
            "iata": "PSG",
            "airport": "Petersburg James A Johnson Airport",
            "currency_code": "USD"
          },
          {
            "label": "Petrolina, Brazil (PNZ)",
            "city": "Petrolina",
            "country": "Brazil",
            "iata": "PNZ",
            "airport": "Senador Nilo Coelho Airport"
          },
          {
            "label": "Petropavlovsk, Kazakhstan (PPK)",
            "city": "Petropavlovsk",
            "country": "Kazakhstan",
            "iata": "PPK",
            "airport": "Petropavlosk South Airport"
          },
          {
            "label": "Petropavlovsk-Kamchats, Russia (PKC)",
            "city": "Petropavlovsk-Kamchats",
            "country": "Russia",
            "iata": "PKC",
            "airport": "Yelizovo Airport"
          },
          {
            "label": "Petrozavodsk, Russia (PES)",
            "city": "Petrozavodsk",
            "country": "Russia",
            "iata": "PES",
            "airport": "Petrozavodsk Airport"
          },
          {
            "label": "Pevek, Russia (PWE)",
            "city": "Pevek",
            "country": "Russia",
            "iata": "PWE",
            "airport": "Pevek Airport"
          },
          {
            "label": "Phalaborwa, South Africa (PHW)",
            "city": "Phalaborwa",
            "country": "South Africa",
            "iata": "PHW",
            "airport": "Hendrik Van Eck Airport"
          },
          {
            "label": "Phaplu, Nepal (PPL)",
            "city": "Phaplu",
            "country": "Nepal",
            "iata": "PPL",
            "airport": "Phaplu Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Phitsanulok, Thailand (PHS)",
            "city": "Phitsanulok",
            "country": "Thailand",
            "iata": "PHS",
            "airport": "Phitsanulok Airport",
            "currency_code": "THB"
          },
          {
            "label": "Phu Quoc, Vietnam (PQC)",
            "city": "Phu Quoc",
            "country": "Vietnam",
            "iata": "PQC",
            "airport": "Phu Quoc Airport"
          },
          {
            "label": "Piarco/Port of Spain, Trinidad (POS)",
            "city": "Piarco/Port of Spain",
            "country": "Trinidad",
            "iata": "POS",
            "airport": "Piarco International Airport"
          },
          {
            "label": "Pickle Lake, Canada (YPL)",
            "city": "Pickle Lake",
            "country": "Canada",
            "iata": "YPL",
            "airport": "Pickle Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Pico Island, Portugal (PIX)",
            "city": "Pico Island",
            "country": "Portugal",
            "iata": "PIX",
            "airport": "Pico Airport"
          },
          {
            "label": "Piedras Negras, Mexico (PDS)",
            "city": "Piedras Negras",
            "country": "Mexico",
            "iata": "PDS",
            "airport": "Piedras Negras International Airport"
          },
          {
            "label": "Pierre, US (PIR)",
            "city": "Pierre",
            "country": "US",
            "iata": "PIR",
            "airport": "Pierre Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Pietermaritzburg, South Africa (PZB)",
            "city": "Pietermaritzburg",
            "country": "South Africa",
            "iata": "PZB",
            "airport": "Pietermaritzburg Airport"
          },
          {
            "label": "Pikangikum, Canada (YPM)",
            "city": "Pikangikum",
            "country": "Canada",
            "iata": "YPM",
            "airport": "Pikangikum Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Pikwitonei, Canada (PIW)",
            "city": "Pikwitonei",
            "country": "Canada",
            "iata": "PIW",
            "airport": "Pikwitonei Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Pilot Point, US (UGB)",
            "city": "Pilot Point",
            "country": "US",
            "iata": "UGB",
            "airport": "Ugashik Bay Airport",
            "currency_code": "USD"
          },
          {
            "label": "Pingtung, Taiwan (PIF)",
            "city": "Pingtung",
            "country": "Taiwan",
            "iata": "PIF",
            "airport": "Pingtung North Airport"
          },
          {
            "label": "Pisa, Italy (PSA)",
            "city": "Pisa",
            "country": "Italy",
            "iata": "PSA",
            "airport": "Pisa / San Giusto - Galileo Galilei International Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Pisco, Peru (PIO)",
            "city": "Pisco",
            "country": "Peru",
            "iata": "PIO",
            "airport": ""
          },
          {
            "label": "Piura, Peru (PIU)",
            "city": "Piura",
            "country": "Peru",
            "iata": "PIU",
            "airport": ""
          },
          {
            "label": "Platinum, US (PTU)",
            "city": "Platinum",
            "country": "US",
            "iata": "PTU",
            "airport": "Platinum Airport",
            "currency_code": "USD"
          },
          {
            "label": "Plattsburgh, US (PBG)",
            "city": "Plattsburgh",
            "country": "US",
            "iata": "PBG",
            "airport": "Plattsburgh International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Pleiku, Vietnam (PXU)",
            "city": "Pleiku",
            "country": "Vietnam",
            "iata": "PXU",
            "airport": "Pleiku Airport"
          },
          {
            "label": "Plymouth, UK (PLH)",
            "city": "Plymouth",
            "country": "UK",
            "iata": "PLH",
            "airport": "Plymouth City Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Pocatello, US (PIH)",
            "city": "Pocatello",
            "country": "US",
            "iata": "PIH",
            "airport": "Pocatello Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Podgorica, Montenegro (TGD)",
            "city": "Podgorica",
            "country": "Montenegro",
            "iata": "TGD",
            "airport": "Podgorica Airport"
          },
          {
            "label": "Pohang, South Korea (KPO)",
            "city": "Pohang",
            "country": "South Korea",
            "iata": "KPO",
            "airport": "Pohang Airport"
          },
          {
            "label": "Point Hope, US (PHO)",
            "city": "Point Hope",
            "country": "US",
            "iata": "PHO",
            "airport": "Point Hope Airport",
            "currency_code": "USD"
          },
          {
            "label": "Point Lay, US (PIZ)",
            "city": "Point Lay",
            "country": "US",
            "iata": "PIZ",
            "airport": "Point Lay Lrrs Airport",
            "currency_code": "USD"
          },
          {
            "label": "Poitiers, France (PIS)",
            "city": "Poitiers",
            "country": "France",
            "iata": "PIS",
            "airport": "Poitiers-Biard Airport"
          },
          {
            "label": "Pokhara, Nepal (PKR)",
            "city": "Pokhara",
            "country": "Nepal",
            "iata": "PKR",
            "airport": "Pokhara Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Polokwane, South Africa (PTG)",
            "city": "Polokwane",
            "country": "South Africa",
            "iata": "PTG",
            "airport": "Pietersburg Municipal Airport"
          },
          {
            "label": "Polyarnyj, Russia (PYJ)",
            "city": "Polyarnyj",
            "country": "Russia",
            "iata": "PYJ",
            "airport": "Polyarny Airport"
          },
          {
            "label": "Pond Inlet, Canada (YIO)",
            "city": "Pond Inlet",
            "country": "Canada",
            "iata": "YIO",
            "airport": "Pond Inlet Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Ponta Delgada, Portugal (PDL)",
            "city": "Ponta Delgada",
            "country": "Portugal",
            "iata": "PDL",
            "airport": ""
          },
          {
            "label": "Pontianak, Indonesia (PNK)",
            "city": "Pontianak",
            "country": "Indonesia",
            "iata": "PNK",
            "airport": "Supadio Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Popayan, Colombia (PPN)",
            "city": "Popayan",
            "country": "Colombia",
            "iata": "PPN",
            "airport": "",
            "currency_code": "COP"
          },
          {
            "label": "Poplar Hill, Canada (YHP)",
            "city": "Poplar Hill",
            "country": "Canada",
            "iata": "YHP",
            "airport": "Poplar Hill Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Popondetta, Papua New Guinea (PNP)",
            "city": "Popondetta",
            "country": "Papua New Guinea",
            "iata": "PNP",
            "airport": "Girua Airport"
          },
          {
            "label": "Pori, Finland (POR)",
            "city": "Pori",
            "country": "Finland",
            "iata": "POR",
            "airport": "Pori Airport"
          },
          {
            "label": "Porlamar, Venezuela (PMV)",
            "city": "Porlamar",
            "country": "Venezuela",
            "iata": "PMV",
            "airport": ""
          },
          {
            "label": "Port Angeles, US (CLM)",
            "city": "Port Angeles",
            "country": "US",
            "iata": "CLM",
            "airport": "William R Fairchild International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Port Clarence, US (KPC)",
            "city": "Port Clarence",
            "country": "US",
            "iata": "KPC",
            "airport": "Port Clarence Coast Guard Station",
            "currency_code": "USD"
          },
          {
            "label": "Port Elizabeth, South Africa (PLZ)",
            "city": "Port Elizabeth",
            "country": "South Africa",
            "iata": "PLZ",
            "airport": "Port Elizabeth Airport"
          },
          {
            "label": "Port Gentil, Gabon (POG)",
            "city": "Port Gentil",
            "country": "Gabon",
            "iata": "POG",
            "airport": "Port Gentil Airport"
          },
          {
            "label": "Port Hardy, Canada (YZT)",
            "city": "Port Hardy",
            "country": "Canada",
            "iata": "YZT",
            "airport": "Port Hardy Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Port Hedland, Australia (PHE)",
            "city": "Port Hedland",
            "country": "Australia",
            "iata": "PHE",
            "airport": "Port Hedland International Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Port Heiden, US (PTH)",
            "city": "Port Heiden",
            "country": "US",
            "iata": "PTH",
            "airport": "Port Heiden Airport",
            "currency_code": "USD"
          },
          {
            "label": "Port Hope Simpson, Canada (YHA)",
            "city": "Port Hope Simpson",
            "country": "Canada",
            "iata": "YHA",
            "airport": "Port Hope Simpson Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Port Lincoln, Australia (PLO)",
            "city": "Port Lincoln",
            "country": "Australia",
            "iata": "PLO",
            "airport": "Port Lincoln Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Port Macquarie, Australia (PQQ)",
            "city": "Port Macquarie",
            "country": "Australia",
            "iata": "PQQ",
            "airport": "Port Macquarie Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Port Moresby, Papua New Guinea (POM)",
            "city": "Port Moresby",
            "country": "Papua New Guinea",
            "iata": "POM",
            "airport": "Port Moresby Jacksons International Airport"
          },
          {
            "label": "Port Vila, Vanuatu (VLI)",
            "city": "Port Vila",
            "country": "Vanuatu",
            "iata": "VLI",
            "airport": "Port Vila Bauerfield Airport"
          },
          {
            "label": "Portage Creek, US (PCA)",
            "city": "Portage Creek",
            "country": "US",
            "iata": "PCA",
            "airport": "Picacho Stagefield Heliport",
            "currency_code": "USD"
          },
          {
            "label": "Porto Alegre, Brazil (POA)",
            "city": "Porto Alegre",
            "country": "Brazil",
            "iata": "POA",
            "airport": "Salgado Filho Airport"
          },
          {
            "label": "Porto Santo, Portugal (PXO)",
            "city": "Porto Santo",
            "country": "Portugal",
            "iata": "PXO",
            "airport": "Porto Santo Airport"
          },
          {
            "label": "Porto Seguro, Brazil (BPS)",
            "city": "Porto Seguro",
            "country": "Brazil",
            "iata": "BPS",
            "airport": "Porto Seguro Airport"
          },
          {
            "label": "Porto Velho, Brazil (PVH)",
            "city": "Porto Velho",
            "country": "Brazil",
            "iata": "PVH",
            "airport": "Governador Jorge Teixeira de Oliveira Airport"
          },
          {
            "label": "Porto, Portugal (OPO)",
            "city": "Porto",
            "country": "Portugal",
            "iata": "OPO",
            "airport": ""
          },
          {
            "label": "Portsmouth, US (PSM)",
            "city": "Portsmouth",
            "country": "US",
            "iata": "PSM",
            "airport": "Portsmouth International at Pease Airport",
            "currency_code": "USD"
          },
          {
            "label": "Posadas, Argentina (PSS)",
            "city": "Posadas",
            "country": "Argentina",
            "iata": "PSS",
            "airport": "Libertador Gral D Jose De San Martin Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Povungnituk, Canada (YPX)",
            "city": "Povungnituk",
            "country": "Canada",
            "iata": "YPX",
            "airport": "Puvirnituq Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Powell River, Canada (YPW)",
            "city": "Powell River",
            "country": "Canada",
            "iata": "YPW",
            "airport": "Powell River Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Poza Rica, Mexico (PAZ)",
            "city": "Poza Rica",
            "country": "Mexico",
            "iata": "PAZ",
            "airport": ""
          },
          {
            "label": "Poznan, Poland (POZ)",
            "city": "Poznan",
            "country": "Poland",
            "iata": "POZ",
            "airport": "Poznan-lawica Airport"
          },
          {
            "label": "Praia, Cape Verde (RAI)",
            "city": "Praia",
            "country": "Cape Verde",
            "iata": "RAI",
            "airport": "Praia International Airport"
          },
          {
            "label": "Praslin Island, Seychelles (PRI)",
            "city": "Praslin Island",
            "country": "Seychelles",
            "iata": "PRI",
            "airport": "Praslin Airport"
          },
          {
            "label": "Prescott, US (PRC)",
            "city": "Prescott",
            "country": "US",
            "iata": "PRC",
            "airport": "Ernest A. Love Field",
            "currency_code": "USD"
          },
          {
            "label": "Presidente Prudente, Brazil (PPB)",
            "city": "Presidente Prudente",
            "country": "Brazil",
            "iata": "PPB",
            "airport": "Presidente Prudente Airport"
          },
          {
            "label": "Presque Isle, US (PQI)",
            "city": "Presque Isle",
            "country": "US",
            "iata": "PQI",
            "airport": "Northern Maine Regional Airport at Presque Isle",
            "currency_code": "USD"
          },
          {
            "label": "Preveza/Lefkas, Greece (PVK)",
            "city": "Preveza/Lefkas",
            "country": "Greece",
            "iata": "PVK",
            "airport": "Aktion National Airport"
          },
          {
            "label": "Prince George, Canada (YXS)",
            "city": "Prince George",
            "country": "Canada",
            "iata": "YXS",
            "airport": "Prince George Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Prince Rupert, Canada (YPR)",
            "city": "Prince Rupert",
            "country": "Canada",
            "iata": "YPR",
            "airport": "Prince Rupert Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Principe, Sao Tome (PCP)",
            "city": "Principe",
            "country": "Sao Tome",
            "iata": "PCP",
            "airport": "Principe Airport"
          },
          {
            "label": "Pristina, Serbia (PRN)",
            "city": "Pristina",
            "country": "Serbia",
            "iata": "PRN",
            "airport": ""
          },
          {
            "label": "Proserpine, Australia (PPP)",
            "city": "Proserpine",
            "country": "Australia",
            "iata": "PPP",
            "airport": "Proserpine Whitsunday Coast Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Providence, US (PVD)",
            "city": "Providence",
            "country": "US",
            "iata": "PVD",
            "airport": "Theodore Francis Green State Airport",
            "currency_code": "USD"
          },
          {
            "label": "Providencia, Colombia (PVA)",
            "city": "Providencia",
            "country": "Colombia",
            "iata": "PVA",
            "airport": "El Embrujo Airport",
            "currency_code": "COP"
          },
          {
            "label": "Prudhoe Bay/Deadhorse, US (SCC)",
            "city": "Prudhoe Bay/Deadhorse",
            "country": "US",
            "iata": "SCC",
            "airport": "Deadhorse Airport",
            "currency_code": "USD"
          },
          {
            "label": "Pskov, Russia (PKV)",
            "city": "Pskov",
            "country": "Russia",
            "iata": "PKV",
            "airport": "Pskov Airport"
          },
          {
            "label": "Pucallpa, Peru (PCL)",
            "city": "Pucallpa",
            "country": "Peru",
            "iata": "PCL",
            "airport": "Cap FAP David Abenzur Rengifo International Airport"
          },
          {
            "label": "Pucon, Chile (ZPC)",
            "city": "Pucon",
            "country": "Chile",
            "iata": "ZPC",
            "airport": ""
          },
          {
            "label": "Puebla, Mexico (PBC)",
            "city": "Puebla",
            "country": "Mexico",
            "iata": "PBC",
            "airport": ""
          },
          {
            "label": "Pueblo, US (PUB)",
            "city": "Pueblo",
            "country": "US",
            "iata": "PUB",
            "airport": "Pueblo Memorial Airport",
            "currency_code": "USD"
          },
          {
            "label": "Puerto Asis, Colombia (PUU)",
            "city": "Puerto Asis",
            "country": "Colombia",
            "iata": "PUU",
            "airport": "Tres De Mayo Airport",
            "currency_code": "COP"
          },
          {
            "label": "Puerto Ayacucho, Venezuela (PYH)",
            "city": "Puerto Ayacucho",
            "country": "Venezuela",
            "iata": "PYH",
            "airport": "Cacique Aramare Airport"
          },
          {
            "label": "Puerto Carreno, Colombia (PCR)",
            "city": "Puerto Carreno",
            "country": "Colombia",
            "iata": "PCR",
            "airport": "German Olano Airport",
            "currency_code": "COP"
          },
          {
            "label": "Puerto Escondido, Mexico (PXM)",
            "city": "Puerto Escondido",
            "country": "Mexico",
            "iata": "PXM",
            "airport": "Puerto Escondido International Airport"
          },
          {
            "label": "Puerto Inirida, Colombia (PDA)",
            "city": "Puerto Inirida",
            "country": "Colombia",
            "iata": "PDA",
            "airport": "Obando Airport"
          },
          {
            "label": "Puerto Leguizamo, Colombia (LQM)",
            "city": "Puerto Leguizamo",
            "country": "Colombia",
            "iata": "LQM",
            "airport": "Caucaya Airport",
            "currency_code": "COP"
          },
          {
            "label": "Puerto Madryn, Argentina (PMY)",
            "city": "Puerto Madryn",
            "country": "Argentina",
            "iata": "PMY",
            "airport": "El Tehuelche Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Puerto Maldonado, Peru (PEM)",
            "city": "Puerto Maldonado",
            "country": "Peru",
            "iata": "PEM",
            "airport": "Padre Aldamiz International Airport"
          },
          {
            "label": "Puerto Montt, Chile (PMC)",
            "city": "Puerto Montt",
            "country": "Chile",
            "iata": "PMC",
            "airport": "El Tepual Airport"
          },
          {
            "label": "Puerto Ordaz, Venezuela (PZO)",
            "city": "Puerto Ordaz",
            "country": "Venezuela",
            "iata": "PZO",
            "airport": "General Manuel Carlos Piar International Airport"
          },
          {
            "label": "Puerto Penasco, Mexico (PPE)",
            "city": "Puerto Penasco",
            "country": "Mexico",
            "iata": "PPE",
            "airport": "Puerto Penasco Airport"
          },
          {
            "label": "Puerto Princesa, Philippines (PPS)",
            "city": "Puerto Princesa",
            "country": "Philippines",
            "iata": "PPS",
            "airport": "Puerto Princesa Airport"
          },
          {
            "label": "Puerto Suarez, Bolivia (PSZ)",
            "city": "Puerto Suarez",
            "country": "Bolivia",
            "iata": "PSZ",
            "airport": ""
          },
          {
            "label": "Puerto Vallarta, Mexico (PVR)",
            "city": "Puerto Vallarta",
            "country": "Mexico",
            "iata": "PVR",
            "airport": ""
          },
          {
            "label": "Pula, Croatia (PUY)",
            "city": "Pula",
            "country": "Croatia",
            "iata": "PUY",
            "airport": "Pula Airport"
          },
          {
            "label": "Pullman, US (PUW)",
            "city": "Pullman",
            "country": "US",
            "iata": "PUW",
            "airport": "Pullman Moscow Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Punta Arenas, Chile (PUQ)",
            "city": "Punta Arenas",
            "country": "Chile",
            "iata": "PUQ",
            "airport": ""
          },
          {
            "label": "Punta del Este, Uruguay (PDP)",
            "city": "Punta del Este",
            "country": "Uruguay",
            "iata": "PDP",
            "airport": "Capitan Corbeta CA Curbelo International Airport"
          },
          {
            "label": "Qaanaaq, Greenland (NAQ)",
            "city": "Qaanaaq",
            "country": "Greenland",
            "iata": "NAQ",
            "airport": "Qaanaaq Airport"
          },
          {
            "label": "Qaarsut, Greenland (JQA)",
            "city": "Qaarsut",
            "country": "Greenland",
            "iata": "JQA",
            "airport": "Qaarsut Airport"
          },
          {
            "label": "Qaisumah, Saudi Arabia (AQI)",
            "city": "Qaisumah",
            "country": "Saudi Arabia",
            "iata": "AQI",
            "airport": "Hafr Al Batin Airport"
          },
          {
            "label": "Qasigiannguit, Greenland (JCH)",
            "city": "Qasigiannguit",
            "country": "Greenland",
            "iata": "JCH",
            "airport": "Qasigiannguit Heliport"
          },
          {
            "label": "Qeqertarsuaq, Greenland (JGO)",
            "city": "Qeqertarsuaq",
            "country": "Greenland",
            "iata": "JGO",
            "airport": "Qeqertarsuaq Heliport"
          },
          {
            "label": "Qiemo, China (IQM)",
            "city": "Qiemo",
            "country": "China",
            "iata": "IQM",
            "airport": "Qiemo Airport"
          },
          {
            "label": "Qikiqtarjuaq, Canada (YVM)",
            "city": "Qikiqtarjuaq",
            "country": "Canada",
            "iata": "YVM",
            "airport": "Qikiqtarjuaq Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Qingdao, China (TAO)",
            "city": "Qingdao",
            "country": "China",
            "iata": "TAO",
            "airport": "Liuting Airport"
          },
          {
            "label": "Qingyang, China (IQN)",
            "city": "Qingyang",
            "country": "China",
            "iata": "IQN",
            "airport": "Qingyang Airport"
          },
          {
            "label": "Qinhuangdao, China (SHP)",
            "city": "Qinhuangdao",
            "country": "China",
            "iata": "SHP",
            "airport": "Shanhaiguan Airport"
          },
          {
            "label": "Qiqihar, China (NDG)",
            "city": "Qiqihar",
            "country": "China",
            "iata": "NDG",
            "airport": "Qiqihar Sanjiazi Airport"
          },
          {
            "label": "Quanzhou, China (JJN)",
            "city": "Quanzhou",
            "country": "China",
            "iata": "JJN",
            "airport": "Quanzhou Airport"
          },
          {
            "label": "Quaqtaq, Canada (YQC)",
            "city": "Quaqtaq",
            "country": "Canada",
            "iata": "YQC",
            "airport": "Quaqtaq Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Quebec, Canada (YQB)",
            "city": "Quebec",
            "country": "Canada",
            "iata": "YQB",
            "airport": "Quebec Jean Lesage International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Queenstown, New Zealand (ZQN)",
            "city": "Queenstown",
            "country": "New Zealand",
            "iata": "ZQN",
            "airport": "Queenstown International Airport"
          },
          {
            "label": "Queretaro, Mexico (QRO)",
            "city": "Queretaro",
            "country": "Mexico",
            "iata": "QRO",
            "airport": ""
          },
          {
            "label": "Quesnel, Canada (YQZ)",
            "city": "Quesnel",
            "country": "Canada",
            "iata": "YQZ",
            "airport": "Quesnel Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Qui Nhon, Vietnam (UIH)",
            "city": "Qui Nhon",
            "country": "Vietnam",
            "iata": "UIH",
            "airport": "Phu Cat Airport"
          },
          {
            "label": "Quibdo, Colombia (UIB)",
            "city": "Quibdo",
            "country": "Colombia",
            "iata": "UIB",
            "airport": "",
            "currency_code": "COP"
          },
          {
            "label": "Quilpie, Australia (ULP)",
            "city": "Quilpie",
            "country": "Australia",
            "iata": "ULP",
            "airport": "Quilpie Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Quimper, France (UIP)",
            "city": "Quimper",
            "country": "France",
            "iata": "UIP",
            "airport": "Quimper-Cornouaille Airport"
          },
          {
            "label": "Quincy, US (UIN)",
            "city": "Quincy",
            "country": "US",
            "iata": "UIN",
            "airport": "Quincy Regional Baldwin Field",
            "currency_code": "USD"
          },
          {
            "label": "Quito, Ecuador (UIO)",
            "city": "Quito",
            "country": "Ecuador",
            "iata": "UIO",
            "airport": "Mariscal Sucre International Airport"
          },
          {
            "label": "Rabat, Morocco (RBA)",
            "city": "Rabat",
            "country": "Morocco",
            "iata": "RBA",
            "airport": ""
          },
          {
            "label": "Rabaul, Papua New Guinea (RAB)",
            "city": "Rabaul",
            "country": "Papua New Guinea",
            "iata": "RAB",
            "airport": "Tokua Airport"
          },
          {
            "label": "Rach Gia, Vietnam (VKG)",
            "city": "Rach Gia",
            "country": "Vietnam",
            "iata": "VKG",
            "airport": "Rach Gia Airport"
          },
          {
            "label": "Rae Lakes, Canada (YRA)",
            "city": "Rae Lakes",
            "country": "Canada",
            "iata": "YRA",
            "airport": "Rae Lakes Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Rafha, Saudi Arabia (RAH)",
            "city": "Rafha",
            "country": "Saudi Arabia",
            "iata": "RAH",
            "airport": "Rafha Domestic Airport"
          },
          {
            "label": "Rainbow Lake, Canada (YOP)",
            "city": "Rainbow Lake",
            "country": "Canada",
            "iata": "YOP",
            "airport": "Rainbow Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Ramata, Solomon Islands (RBV)",
            "city": "Ramata",
            "country": "Solomon Islands",
            "iata": "RBV",
            "airport": "Ramata Airport"
          },
          {
            "label": "Rankin Inlet, Canada (YRT)",
            "city": "Rankin Inlet",
            "country": "Canada",
            "iata": "YRT",
            "airport": "Rankin Inlet Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Ranong, Thailand (UNN)",
            "city": "Ranong",
            "country": "Thailand",
            "iata": "UNN",
            "airport": "Ranong Airport",
            "currency_code": "THB"
          },
          {
            "label": "Rapid City, US (RAP)",
            "city": "Rapid City",
            "country": "US",
            "iata": "RAP",
            "airport": "Rapid City Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Rarotonga, Cook Islands (RAR)",
            "city": "Rarotonga",
            "country": "Cook Islands",
            "iata": "RAR",
            "airport": "Rarotonga International Airport"
          },
          {
            "label": "Recife, Brazil (REC)",
            "city": "Recife",
            "country": "Brazil",
            "iata": "REC",
            "airport": "Guararapes - Gilberto Freyre International Airport"
          },
          {
            "label": "Red Deer, Canada (YQF)",
            "city": "Red Deer",
            "country": "Canada",
            "iata": "YQF",
            "airport": "Red Deer Regional Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Red Lake, Canada (YRL)",
            "city": "Red Lake",
            "country": "Canada",
            "iata": "YRL",
            "airport": "Red Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Red Sucker Lake, Canada (YRS)",
            "city": "Red Sucker Lake",
            "country": "Canada",
            "iata": "YRS",
            "airport": "Red Sucker Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Redang, Malaysia (RDN)",
            "city": "Redang",
            "country": "Malaysia",
            "iata": "RDN",
            "airport": "LTS Pulau Redang Airport"
          },
          {
            "label": "Redcliffe, Vanuatu (RCL)",
            "city": "Redcliffe",
            "country": "Vanuatu",
            "iata": "RCL",
            "airport": "Redcliffe Airport"
          },
          {
            "label": "Redding, US (RDD)",
            "city": "Redding",
            "country": "US",
            "iata": "RDD",
            "airport": "Redding Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Reggio Calabria, Italy (REG)",
            "city": "Reggio Calabria",
            "country": "Italy",
            "iata": "REG",
            "airport": "Reggio Calabria Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Regina, Canada (YQR)",
            "city": "Regina",
            "country": "Canada",
            "iata": "YQR",
            "airport": "Regina International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Rennell, Solomon Islands (RNL)",
            "city": "Rennell",
            "country": "Solomon Islands",
            "iata": "RNL",
            "airport": "Rennell/Tingoa Airport"
          },
          {
            "label": "Rennes, France (RNS)",
            "city": "Rennes",
            "country": "France",
            "iata": "RNS",
            "airport": "Rennes-Saint-Jacques Airport"
          },
          {
            "label": "Reno, US (RNO)",
            "city": "Reno",
            "country": "US",
            "iata": "RNO",
            "airport": "Reno Tahoe International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Repulse Bay, Canada (YUT)",
            "city": "Repulse Bay",
            "country": "Canada",
            "iata": "YUT",
            "airport": "Repulse Bay Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Resistencia, Argentina (RES)",
            "city": "Resistencia",
            "country": "Argentina",
            "iata": "RES",
            "airport": "Resistencia International Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Resolute, Canada (YRB)",
            "city": "Resolute",
            "country": "Canada",
            "iata": "YRB",
            "airport": "Resolute Bay Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Reus, Spain (REU)",
            "city": "Reus",
            "country": "Spain",
            "iata": "REU",
            "airport": "Reus Air Base"
          },
          {
            "label": "ReykjavÃƒÂ­k, Iceland (KEF)",
            "city": "ReykjavÃƒÂ­k",
            "country": "Iceland",
            "iata": "REK",
            "airport": "Reykjavik Airport",
            "currency_code": "ISK"
          },
          {
            "label": "ReykjavÃƒÂ­k, Iceland - All Airports (REK)",
            "city": "ReykjavÃƒÂ­k",
            "country": "Iceland",
            "iata": "KEF",
            "airport": "Keflavik International Airport",
            "currency_code": "ISK"
          },
          {
            "label": "Reynosa, Mexico (REX)",
            "city": "Reynosa",
            "country": "Mexico",
            "iata": "REX",
            "airport": "General Lucio Blanco International Airport"
          },
          {
            "label": "Rhinelander, US (RHI)",
            "city": "Rhinelander",
            "country": "US",
            "iata": "RHI",
            "airport": "Rhinelander Oneida County Airport",
            "currency_code": "USD"
          },
          {
            "label": "Rhodes, Greece (RHO)",
            "city": "Rhodes",
            "country": "Greece",
            "iata": "RHO",
            "airport": "Diagoras Airport"
          },
          {
            "label": "Ribeirao Preto, Brazil (RAO)",
            "city": "Ribeirao Preto",
            "country": "Brazil",
            "iata": "RAO",
            "airport": "Leite Lopes Airport"
          },
          {
            "label": "Riberalta, Bolivia (RIB)",
            "city": "Riberalta",
            "country": "Bolivia",
            "iata": "RIB",
            "airport": ""
          },
          {
            "label": "Richards Bay, South Africa (RCB)",
            "city": "Richards Bay",
            "country": "South Africa",
            "iata": "RCB",
            "airport": "Richards Bay Airport"
          },
          {
            "label": "Richmond, Australia (RCM)",
            "city": "Richmond",
            "country": "Australia",
            "iata": "RCM",
            "airport": "Richmond Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Richmond, US (RIC)",
            "city": "Richmond",
            "country": "US",
            "iata": "RIC",
            "airport": "Richmond International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Riga, Latvia (RIX)",
            "city": "Riga",
            "country": "Latvia",
            "iata": "RIX",
            "airport": "Riga International Airport"
          },
          {
            "label": "Rigolet, Canada (YRG)",
            "city": "Rigolet",
            "country": "Canada",
            "iata": "YRG",
            "airport": "Rigolet Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Rijeka, Croatia (RJK)",
            "city": "Rijeka",
            "country": "Croatia",
            "iata": "RJK",
            "airport": "Rijeka Airport"
          },
          {
            "label": "Rimini, Italy (RMI)",
            "city": "Rimini",
            "country": "Italy",
            "iata": "RMI",
            "airport": "Rimini / Miramare - Federico Fellini International Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Rio Branco, Brazil (RBR)",
            "city": "Rio Branco",
            "country": "Brazil",
            "iata": "RBR",
            "airport": "Plácido de Castro International Airport"
          },
          {
            "label": "Rio Gallegos, Argentina (RGL)",
            "city": "Rio Gallegos",
            "country": "Argentina",
            "iata": "RGL",
            "airport": "",
            "currency_code": "ARS"
          },
          {
            "label": "Rio Grande, Argentina (RGA)",
            "city": "Rio Grande",
            "country": "Argentina",
            "iata": "RGA",
            "airport": "Hermes Quijada International Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Riohacha, Colombia (RCH)",
            "city": "Riohacha",
            "country": "Colombia",
            "iata": "RCH",
            "airport": "Almirante Padilla Airport",
            "currency_code": "COP"
          },
          {
            "label": "Rishiri, Japan (RIS)",
            "city": "Rishiri",
            "country": "Japan",
            "iata": "RIS",
            "airport": "Rishiri Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Riyan Mukalla, Yemen (RIY)",
            "city": "Riyan Mukalla",
            "country": "Yemen",
            "iata": "RIY",
            "airport": "Mukalla International Airport"
          },
          {
            "label": "Roanoke, US (ROA)",
            "city": "Roanoke",
            "country": "US",
            "iata": "ROA",
            "airport": "Roanoke Regional Woodrum Field",
            "currency_code": "USD"
          },
          {
            "label": "Roberval, Canada (YRJ)",
            "city": "Roberval",
            "country": "Canada",
            "iata": "YRJ",
            "airport": "Roberval Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Rochester, US (ROC)",
            "city": "Rochester",
            "country": "US",
            "iata": "ROC",
            "airport": "Greater Rochester International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Rochester, US (RST)",
            "city": "Rochester",
            "country": "US",
            "iata": "RST",
            "airport": "Rochester International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Rock Springs, US (RKS)",
            "city": "Rock Springs",
            "country": "US",
            "iata": "RKS",
            "airport": "Rock Springs Sweetwater County Airport",
            "currency_code": "USD"
          },
          {
            "label": "Rockford, US (RFD)",
            "city": "Rockford",
            "country": "US",
            "iata": "RFD",
            "airport": "Chicago Rockford International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Rockhampton, Australia (ROK)",
            "city": "Rockhampton",
            "country": "Australia",
            "iata": "ROK",
            "airport": "Rockhampton Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Rodez, France (RDZ)",
            "city": "Rodez",
            "country": "France",
            "iata": "RDZ",
            "airport": "Rodez-Marcillac Airport"
          },
          {
            "label": "Rodrigues Is, Mauritius (RRG)",
            "city": "Rodrigues Is",
            "country": "Mauritius",
            "iata": "RRG",
            "airport": "Sir Charles Gaetan Duval Airport"
          },
          {
            "label": "Roervik, Norway (RVK)",
            "city": "Roervik",
            "country": "Norway",
            "iata": "RVK",
            "airport": ""
          },
          {
            "label": "Roi Et, Thailand (ROI)",
            "city": "Roi Et",
            "country": "Thailand",
            "iata": "ROI",
            "airport": "Roi Et Airport",
            "currency_code": "THB"
          },
          {
            "label": "Roma, Australia (RMA)",
            "city": "Roma",
            "country": "Australia",
            "iata": "RMA",
            "airport": "Roma Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Rondonopolis, Brazil (ROO)",
            "city": "Rondonopolis",
            "country": "Brazil",
            "iata": "ROO",
            "airport": ""
          },
          {
            "label": "Rongelap Island, Marshall Islands (RNP)",
            "city": "Rongelap Island",
            "country": "Marshall Islands",
            "iata": "RNP",
            "airport": "Rongelap Island Airport"
          },
          {
            "label": "Ronneby, Sweden (RNB)",
            "city": "Ronneby",
            "country": "Sweden",
            "iata": "RNB",
            "airport": "Ronneby Airport"
          },
          {
            "label": "Roros, Norway (RRS)",
            "city": "Roros",
            "country": "Norway",
            "iata": "RRS",
            "airport": ""
          },
          {
            "label": "Rosario, Argentina (ROS)",
            "city": "Rosario",
            "country": "Argentina",
            "iata": "ROS",
            "airport": "Islas Malvinas Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Rost, Norway (RET)",
            "city": "Rost",
            "country": "Norway",
            "iata": "RET",
            "airport": ""
          },
          {
            "label": "Rostock-laage, Germany (RLG)",
            "city": "Rostock-laage",
            "country": "Germany",
            "iata": "RLG",
            "airport": "Rostock-Laage Airport"
          },
          {
            "label": "Rostov On Don, Russia (ROV)",
            "city": "Rostov On Don",
            "country": "Russia",
            "iata": "ROV",
            "airport": "Rostov-na-Donu Airport"
          },
          {
            "label": "Roswell, US (ROW)",
            "city": "Roswell",
            "country": "US",
            "iata": "ROW",
            "airport": "Roswell International Air Center Airport",
            "currency_code": "USD"
          },
          {
            "label": "Rota, Northern Mariana Islands (ROP)",
            "city": "Rota",
            "country": "Northern Mariana Islands",
            "iata": "ROP",
            "airport": "Rota International Airport"
          },
          {
            "label": "Rotorua, New Zealand (ROT)",
            "city": "Rotorua",
            "country": "New Zealand",
            "iata": "ROT",
            "airport": "Rotorua Regional Airport"
          },
          {
            "label": "Rotterdam, Netherlands (RTM)",
            "city": "Rotterdam",
            "country": "Netherlands",
            "iata": "RTM",
            "airport": "Rotterdam Airport"
          },
          {
            "label": "Rotuma Island, Fiji (RTA)",
            "city": "Rotuma Island",
            "country": "Fiji",
            "iata": "RTA",
            "airport": "Rotuma Airport"
          },
          {
            "label": "Rouen, France (URO)",
            "city": "Rouen",
            "country": "France",
            "iata": "URO",
            "airport": "Rouen Airport"
          },
          {
            "label": "Round Lake, Canada (ZRJ)",
            "city": "Round Lake",
            "country": "Canada",
            "iata": "ZRJ",
            "airport": "Round Lake (Weagamow Lake) Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Rouyn, Canada (YUY)",
            "city": "Rouyn",
            "country": "Canada",
            "iata": "YUY",
            "airport": "Rouyn Noranda Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Rovaniemi, Finland (RVN)",
            "city": "Rovaniemi",
            "country": "Finland",
            "iata": "RVN",
            "airport": "Rovaniemi Airport"
          },
          {
            "label": "Roxas, Philippines (RXS)",
            "city": "Roxas",
            "country": "Philippines",
            "iata": "RXS",
            "airport": "Roxas Airport"
          },
          {
            "label": "Ruby, US (RBY)",
            "city": "Ruby",
            "country": "US",
            "iata": "RBY",
            "airport": "Ruby Airport",
            "currency_code": "USD"
          },
          {
            "label": "Rukumkot, Nepal (RUK)",
            "city": "Rukumkot",
            "country": "Nepal",
            "iata": "RUK",
            "airport": "Rukumkot Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Rumjatar, Nepal (RUM)",
            "city": "Rumjatar",
            "country": "Nepal",
            "iata": "RUM",
            "airport": "Rumjatar Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Rurrenabaque, Bolivia (RBQ)",
            "city": "Rurrenabaque",
            "country": "Bolivia",
            "iata": "RBQ",
            "airport": "Rurenabaque Airport"
          },
          {
            "label": "Rutland, US (RUT)",
            "city": "Rutland",
            "country": "US",
            "iata": "RUT",
            "airport": "Rutland - Southern Vermont Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Rzeszow, Poland (RZE)",
            "city": "Rzeszow",
            "country": "Poland",
            "iata": "RZE",
            "airport": ""
          },
          {
            "label": "Saarbruecken, Germany (SCN)",
            "city": "Saarbruecken",
            "country": "Germany",
            "iata": "SCN",
            "airport": ""
          },
          {
            "label": "Saarmelleek, Hungary (SOB)",
            "city": "Saarmelleek",
            "country": "Hungary",
            "iata": "SOB",
            "airport": ""
          },
          {
            "label": "Sachigo Lake, Canada (ZPB)",
            "city": "Sachigo Lake",
            "country": "Canada",
            "iata": "ZPB",
            "airport": "Sachigo Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Sachs Harbour, Canada (YSY)",
            "city": "Sachs Harbour",
            "country": "Canada",
            "iata": "YSY",
            "airport": "Sachs Harbour (David Nasogaluak Jr. Saaryuaq) Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Sacramento, US (SMF)",
            "city": "Sacramento",
            "country": "US",
            "iata": "SMF",
            "airport": "Sacramento International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Saga, Japan (HSG)",
            "city": "Saga",
            "country": "Japan",
            "iata": "HSG",
            "airport": "Saga Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Saibai Island, Australia (SBR)",
            "city": "Saibai Island",
            "country": "Australia",
            "iata": "SBR",
            "airport": "Saibai Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Saint Catharines, Canada (YCM)",
            "city": "Saint Catharines",
            "country": "Canada",
            "iata": "YCM",
            "airport": "Niagara District Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Saint Cloud, US (STC)",
            "city": "Saint Cloud",
            "country": "US",
            "iata": "STC",
            "airport": "St Cloud Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Saint Denis, RÃƒÂ¯Ã‚Â¿Ã‚Â½union (RUN)",
            "city": "Saint Denis",
            "country": "RÃƒÂ¯Ã‚Â¿Ã‚Â½union",
            "iata": "RUN",
            "airport": "Roland Garros Airport"
          },
          {
            "label": "Saint John, Canada (YSJ)",
            "city": "Saint John",
            "country": "Canada",
            "iata": "YSJ",
            "airport": "Saint John Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Saint Johns, Canada (YYT)",
            "city": "Saint Johns",
            "country": "Canada",
            "iata": "YYT",
            "airport": "St Johns International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Saint Louis, Senegal (XLS)",
            "city": "Saint Louis",
            "country": "Senegal",
            "iata": "XLS",
            "airport": "Saint Louis Airport"
          },
          {
            "label": "Saint Marys, US (KSM)",
            "city": "Saint Marys",
            "country": "US",
            "iata": "KSM",
            "airport": "St Mary's Airport",
            "currency_code": "USD"
          },
          {
            "label": "Saint Paul Island, US (SNP)",
            "city": "Saint Paul Island",
            "country": "US",
            "iata": "SNP",
            "airport": "St Paul Island Airport",
            "currency_code": "USD"
          },
          {
            "label": "Sainte Marie, Madagascar (SMS)",
            "city": "Sainte Marie",
            "country": "Madagascar",
            "iata": "SMS",
            "airport": "Sainte Marie Airport"
          },
          {
            "label": "Saipan, Northern Mariana Islands (SPN)",
            "city": "Saipan",
            "country": "Northern Mariana Islands",
            "iata": "SPN",
            "airport": "Francisco C. Ada Saipan International Airport"
          },
          {
            "label": "Sakon Nakhon, Thailand (SNO)",
            "city": "Sakon Nakhon",
            "country": "Thailand",
            "iata": "SNO",
            "airport": "Sakon Nakhon Airport",
            "currency_code": "THB"
          },
          {
            "label": "Sal, Cape Verde (SID)",
            "city": "Sal",
            "country": "Cape Verde",
            "iata": "SID",
            "airport": ""
          },
          {
            "label": "Salalah, Oman (SLL)",
            "city": "Salalah",
            "country": "Oman",
            "iata": "SLL",
            "airport": "Salalah Airport"
          },
          {
            "label": "Salamanca, Spain (SLM)",
            "city": "Salamanca",
            "country": "Spain",
            "iata": "SLM",
            "airport": "Salamanca Airport"
          },
          {
            "label": "Salekhard, Russia (SLY)",
            "city": "Salekhard",
            "country": "Russia",
            "iata": "SLY",
            "airport": "Salekhard Airport"
          },
          {
            "label": "Salina Cruz, Mexico (SCX)",
            "city": "Salina Cruz",
            "country": "Mexico",
            "iata": "SCX",
            "airport": "Salina Cruz Naval Air Station"
          },
          {
            "label": "Salina, US (SLN)",
            "city": "Salina",
            "country": "US",
            "iata": "SLN",
            "airport": "Salina Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Salinas, Ecuador (SNC)",
            "city": "Salinas",
            "country": "Ecuador",
            "iata": "SNC",
            "airport": "General Ulpiano Paez Airport"
          },
          {
            "label": "Salisbury-Ocean City, US (SBY)",
            "city": "Salisbury-Ocean City",
            "country": "US",
            "iata": "SBY",
            "airport": "Salisbury Ocean City Wicomico Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Salluit, Canada (YZG)",
            "city": "Salluit",
            "country": "Canada",
            "iata": "YZG",
            "airport": "Salluit Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Salt Lake City, US (SLC)",
            "city": "Salt Lake City",
            "country": "US",
            "iata": "SLC",
            "airport": "Salt Lake City International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Salta, Argentina (SLA)",
            "city": "Salta",
            "country": "Argentina",
            "iata": "SLA",
            "airport": "Martin Miguel De Guemes International Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Saltillo, Mexico (SLW)",
            "city": "Saltillo",
            "country": "Mexico",
            "iata": "SLW",
            "airport": "Plan De Guadalupe International Airport"
          },
          {
            "label": "Salvador, Brazil (SSA)",
            "city": "Salvador",
            "country": "Brazil",
            "iata": "SSA",
            "airport": "Deputado Luís Eduardo Magalhães International Airport"
          },
          {
            "label": "Salzburg, Austria (SZG)",
            "city": "Salzburg",
            "country": "Austria",
            "iata": "SZG",
            "airport": "Salzburg Airport"
          },
          {
            "label": "Samara, Russia (KUF)",
            "city": "Samara",
            "country": "Russia",
            "iata": "KUF",
            "airport": "Kurumoch International Airport"
          },
          {
            "label": "Samarkand, Uzbekistan (SKD)",
            "city": "Samarkand",
            "country": "Uzbekistan",
            "iata": "SKD",
            "airport": "Samarkand Airport"
          },
          {
            "label": "Sambava, Madagascar (SVB)",
            "city": "Sambava",
            "country": "Madagascar",
            "iata": "SVB",
            "airport": "Sambava Airport"
          },
          {
            "label": "Samburu, Kenya (UAS)",
            "city": "Samburu",
            "country": "Kenya",
            "iata": "UAS",
            "airport": "Samburu South Airport"
          },
          {
            "label": "Samos, Greece (SMI)",
            "city": "Samos",
            "country": "Greece",
            "iata": "SMI",
            "airport": "Samos Airport"
          },
          {
            "label": "Samsun, Turkey (SZF)",
            "city": "Samsun",
            "country": "Turkey",
            "iata": "SZF",
            "airport": ""
          },
          {
            "label": "San Andres Island, Colombia (ADZ)",
            "city": "San Andres Island",
            "country": "Colombia",
            "iata": "ADZ",
            "airport": "Gustavo Rojas Pinilla International Airport",
            "currency_code": "COP"
          },
          {
            "label": "San Angelo, US (SJT)",
            "city": "San Angelo",
            "country": "US",
            "iata": "SJT",
            "airport": "San Angelo Regional Mathis Field",
            "currency_code": "USD"
          },
          {
            "label": "San Antonio, US (SAT)",
            "city": "San Antonio",
            "country": "US",
            "iata": "SAT",
            "airport": "San Antonio International Airport",
            "currency_code": "USD"
          },
          {
            "label": "San Antonio, Venezuela (SVZ)",
            "city": "San Antonio",
            "country": "Venezuela",
            "iata": "SVZ",
            "airport": "San Antonio Del Tachira Airport"
          },
          {
            "label": "San Borja, Bolivia (SRJ)",
            "city": "San Borja",
            "country": "Bolivia",
            "iata": "SRJ",
            "airport": ""
          },
          {
            "label": "San Carlos DeBariloche, Argentina (BRC)",
            "city": "San Carlos DeBariloche",
            "country": "Argentina",
            "iata": "BRC",
            "airport": "San Carlos De Bariloche Airport",
            "currency_code": "ARS"
          },
          {
            "label": "San Cristobal, Ecuador (SCY)",
            "city": "San Cristobal",
            "country": "Ecuador",
            "iata": "SCY",
            "airport": ""
          },
          {
            "label": "San Domino Island, Italy (TQR)",
            "city": "San Domino Island",
            "country": "Italy",
            "iata": "TQR",
            "airport": "San Domino Island Heliport",
            "currency_code": "EUR"
          },
          {
            "label": "San Fernando de Apure, Venezuela (SFD)",
            "city": "San Fernando de Apure",
            "country": "Venezuela",
            "iata": "SFD",
            "airport": "San Fernando De Apure Airport"
          },
          {
            "label": "San Fernando, Philippines (SFE)",
            "city": "San Fernando",
            "country": "Philippines",
            "iata": "SFE",
            "airport": "San Fernando Airport"
          },
          {
            "label": "San Jose Cabo, Mexico (SJD)",
            "city": "San Jose Cabo",
            "country": "Mexico",
            "iata": "SJD",
            "airport": "Los Cabos International Airport"
          },
          {
            "label": "San Jose Del Gua, Colombia (SJE)",
            "city": "San Jose Del Gua",
            "country": "Colombia",
            "iata": "SJE",
            "airport": "Jorge E. Gonzalez Torres Airport",
            "currency_code": "COP"
          },
          {
            "label": "San Juan, Argentina (UAQ)",
            "city": "San Juan",
            "country": "Argentina",
            "iata": "UAQ",
            "airport": "Domingo Faustino Sarmiento Airport",
            "currency_code": "ARS"
          },
          {
            "label": "San Juan, Puerto Rico (SJU)",
            "city": "San Juan",
            "country": "Puerto Rico",
            "iata": "SJU",
            "airport": "Luis Munoz Marin International Airport"
          },
          {
            "label": "San Luis Obispo, US (SBP)",
            "city": "San Luis Obispo",
            "country": "US",
            "iata": "SBP",
            "airport": "San Luis County Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "San Luis Potosa, Mexico (SLP)",
            "city": "San Luis Potosa",
            "country": "Mexico",
            "iata": "SLP",
            "airport": "Ponciano Arriaga International Airport"
          },
          {
            "label": "San Luis, Argentina (LUQ)",
            "city": "San Luis",
            "country": "Argentina",
            "iata": "LUQ",
            "airport": "Brigadier Mayor D Cesar Raul Ojeda Airport",
            "currency_code": "ARS"
          },
          {
            "label": "San Martin DeLos Andes, Argentina (CPC)",
            "city": "San Martin DeLos Andes",
            "country": "Argentina",
            "iata": "CPC",
            "airport": "Aviador C. Campos Airport",
            "currency_code": "ARS"
          },
          {
            "label": "San Rafael, Argentina (AFA)",
            "city": "San Rafael",
            "country": "Argentina",
            "iata": "AFA",
            "airport": "Suboficial Ay Santiago Germano Airport",
            "currency_code": "ARS"
          },
          {
            "label": "San Sebas de la Gomera, Spain (GMZ)",
            "city": "San Sebas de la Gomera",
            "country": "Spain",
            "iata": "GMZ",
            "airport": "La Gomera Airport"
          },
          {
            "label": "San Sebastian, Spain (EAS)",
            "city": "San Sebastian",
            "country": "Spain",
            "iata": "EAS",
            "airport": "San Sebastian Airport"
          },
          {
            "label": "San Tome, Venezuela (SOM)",
            "city": "San Tome",
            "country": "Venezuela",
            "iata": "SOM",
            "airport": "San Tome Airport"
          },
          {
            "label": "San Vicente, Colombia (SVI)",
            "city": "San Vicente",
            "country": "Colombia",
            "iata": "SVI",
            "airport": "Eduardo Falla Solano Airport",
            "currency_code": "COP"
          },
          {
            "label": "Sana'A, Yemen (SAH)",
            "city": "Sana'A",
            "country": "Yemen",
            "iata": "SAH",
            "airport": "Sana'a International Airport"
          },
          {
            "label": "Sand Point, US (SDP)",
            "city": "Sand Point",
            "country": "US",
            "iata": "SDP",
            "airport": "Sand Point Airport",
            "currency_code": "USD"
          },
          {
            "label": "Sandakan, Malaysia (SDK)",
            "city": "Sandakan",
            "country": "Malaysia",
            "iata": "SDK",
            "airport": "Sandakan Airport"
          },
          {
            "label": "Sandane, Norway (SDN)",
            "city": "Sandane",
            "country": "Norway",
            "iata": "SDN",
            "airport": "Sandane Airport, Anda"
          },
          {
            "label": "Sandnessjoen, Norway (SSJ)",
            "city": "Sandnessjoen",
            "country": "Norway",
            "iata": "SSJ",
            "airport": ""
          },
          {
            "label": "Sandspit, Canada (YZP)",
            "city": "Sandspit",
            "country": "Canada",
            "iata": "YZP",
            "airport": "Sandspit Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Sandy Lake, Canada (ZSJ)",
            "city": "Sandy Lake",
            "country": "Canada",
            "iata": "ZSJ",
            "airport": "Sandy Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Sanford, US (SFB)",
            "city": "Sanford",
            "country": "US",
            "iata": "SFB",
            "airport": "Orlando Sanford International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Sanikiluaq, Canada (YSK)",
            "city": "Sanikiluaq",
            "country": "Canada",
            "iata": "YSK",
            "airport": "Sanikiluaq Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Santa Ana, Bolivia (SBL)",
            "city": "Santa Ana",
            "country": "Bolivia",
            "iata": "SBL",
            "airport": "Santa Ana Del Yacuma Airport"
          },
          {
            "label": "Santa Ana, US (SNA)",
            "city": "Santa Ana",
            "country": "US",
            "iata": "SNA",
            "airport": "John Wayne Airport-Orange County Airport",
            "currency_code": "USD"
          },
          {
            "label": "Santa Barbara, US (SBA)",
            "city": "Santa Barbara",
            "country": "US",
            "iata": "SBA",
            "airport": "Santa Barbara Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Santa Cruz De La Palma, Spain (SPC)",
            "city": "Santa Cruz De La Palma",
            "country": "Spain",
            "iata": "SPC",
            "airport": "La Palma Airport"
          },
          {
            "label": "Santa Cruz Is, Solomon Islands (SCZ)",
            "city": "Santa Cruz Is",
            "country": "Solomon Islands",
            "iata": "SCZ",
            "airport": "Santa Cruz/Graciosa Bay/Luova Airport"
          },
          {
            "label": "Santa Cruz, Bolivia (SRZ)",
            "city": "Santa Cruz",
            "country": "Bolivia",
            "iata": "SRZ",
            "airport": "El Trompillo Airport"
          },
          {
            "label": "Santa Cruz, Bolivia (VVI)",
            "city": "Santa Cruz",
            "country": "Bolivia",
            "iata": "VVI",
            "airport": "Viru Viru International Airport"
          },
          {
            "label": "Santa Fe, Argentina (SFN)",
            "city": "Santa Fe",
            "country": "Argentina",
            "iata": "SFN",
            "airport": "Sauce Viejo Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Santa Maria, Brazil (RIA)",
            "city": "Santa Maria",
            "country": "Brazil",
            "iata": "RIA",
            "airport": "Santa Maria Airport"
          },
          {
            "label": "Santa Maria, Portugal (SMA)",
            "city": "Santa Maria",
            "country": "Portugal",
            "iata": "SMA",
            "airport": "Santa Maria Airport"
          },
          {
            "label": "Santa Maria, US (SMX)",
            "city": "Santa Maria",
            "country": "US",
            "iata": "SMX",
            "airport": "Santa Maria Pub/Capt G Allan Hancock Field",
            "currency_code": "USD"
          },
          {
            "label": "Santa Marta, Colombia (SMR)",
            "city": "Santa Marta",
            "country": "Colombia",
            "iata": "SMR",
            "airport": "",
            "currency_code": "COP"
          },
          {
            "label": "Santa Rosa, Argentina (RSA)",
            "city": "Santa Rosa",
            "country": "Argentina",
            "iata": "RSA",
            "airport": "Santa Rosa Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Santa Rosa, Brazil (SRA)",
            "city": "Santa Rosa",
            "country": "Brazil",
            "iata": "SRA",
            "airport": "Santa Rosa Airport"
          },
          {
            "label": "Santander, Spain (SDR)",
            "city": "Santander",
            "country": "Spain",
            "iata": "SDR",
            "airport": "Santander Airport"
          },
          {
            "label": "SantarÃƒÂ¯Ã‚Â¿Ã‚Â½m, Brazil (STM)",
            "city": "SantarÃƒÂ¯Ã‚Â¿Ã‚Â½m",
            "country": "Brazil",
            "iata": "STM",
            "airport": "Maestro Wilson Fonseca Airport"
          },
          {
            "label": "Santiago de Compostela, Spain (SCQ)",
            "city": "Santiago de Compostela",
            "country": "Spain",
            "iata": "SCQ",
            "airport": "Santiago de Compostela Airport"
          },
          {
            "label": "Santiago del Estero, Argentina (SDE)",
            "city": "Santiago del Estero",
            "country": "Argentina",
            "iata": "SDE",
            "airport": "",
            "currency_code": "ARS"
          },
          {
            "label": "Santiago, Chile (SCL)",
            "city": "Santiago",
            "country": "Chile",
            "iata": "SCL",
            "airport": ""
          },
          {
            "label": "Santo Ãƒâ€šngelo, Brazil (GEL)",
            "city": "Santo Ãƒâ€šngelo",
            "country": "Brazil",
            "iata": "GEL",
            "airport": ""
          },
          {
            "label": "Santo Domingo, Venezuela (STD)",
            "city": "Santo Domingo",
            "country": "Venezuela",
            "iata": "STD",
            "airport": "Mayor Buenaventura Vivas International Airport"
          },
          {
            "label": "Sanya, China (SYX)",
            "city": "Sanya",
            "country": "China",
            "iata": "SYX",
            "airport": "Sanya Phoenix International Airport"
          },
          {
            "label": "Sao Filipe, Cape Verde (SFL)",
            "city": "Sao Filipe",
            "country": "Cape Verde",
            "iata": "SFL",
            "airport": ""
          },
          {
            "label": "Sao Jorge Island, Portugal (SJZ)",
            "city": "Sao Jorge Island",
            "country": "Portugal",
            "iata": "SJZ",
            "airport": ""
          },
          {
            "label": "Sao Jose do Rio Preto, Brazil (SJP)",
            "city": "Sao Jose do Rio Preto",
            "country": "Brazil",
            "iata": "SJP",
            "airport": ""
          },
          {
            "label": "Sao Jose dos Campos, Brazil (SJK)",
            "city": "Sao Jose dos Campos",
            "country": "Brazil",
            "iata": "SJK",
            "airport": "Professor Urbano Ernesto Stumpf Airport"
          },
          {
            "label": "Sao Luiz, Brazil (SLZ)",
            "city": "Sao Luiz",
            "country": "Brazil",
            "iata": "SLZ",
            "airport": "Marechal Cunha Machado International Airport"
          },
          {
            "label": "Sao Nicolau, Cape Verde (SNE)",
            "city": "Sao Nicolau",
            "country": "Cape Verde",
            "iata": "SNE",
            "airport": ""
          },
          {
            "label": "Sao Tome, Sao Tome (TMS)",
            "city": "Sao Tome",
            "country": "Sao Tome",
            "iata": "TMS",
            "airport": ""
          },
          {
            "label": "Sao Vicente, Cape Verde (VXE)",
            "city": "Sao Vicente",
            "country": "Cape Verde",
            "iata": "VXE",
            "airport": ""
          },
          {
            "label": "Sapporo, Japan (CTS)",
            "city": "Sapporo",
            "country": "Japan",
            "iata": "CTS",
            "airport": "New Chitose Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Sapporo, Japan (OKD)",
            "city": "Sapporo",
            "country": "Japan",
            "iata": "OKD",
            "airport": "Okadama Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Sara, Vanuatu (SSR)",
            "city": "Sara",
            "country": "Vanuatu",
            "iata": "SSR",
            "airport": "Sara Airport"
          },
          {
            "label": "Sarajevo, Bosnia and Herzegovina (SJJ)",
            "city": "Sarajevo",
            "country": "Bosnia and Herzegovina",
            "iata": "SJJ",
            "airport": "Sarajevo International Airport"
          },
          {
            "label": "Saranac Lake, US (SLK)",
            "city": "Saranac Lake",
            "country": "US",
            "iata": "SLK",
            "airport": "Adirondack Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Saratov, Russia (RTW)",
            "city": "Saratov",
            "country": "Russia",
            "iata": "RTW",
            "airport": "Saratov Central Airport"
          },
          {
            "label": "Sarnia, Canada (YZR)",
            "city": "Sarnia",
            "country": "Canada",
            "iata": "YZR",
            "airport": "Chris Hadfield Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Saskatoon, Canada (YXE)",
            "city": "Saskatoon",
            "country": "Canada",
            "iata": "YXE",
            "airport": "Saskatoon John G. Diefenbaker International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Satu Mare, Romania (SUJ)",
            "city": "Satu Mare",
            "country": "Romania",
            "iata": "SUJ",
            "airport": "Satu Mare Airport",
            "currency_code": "RON"
          },
          {
            "label": "Sault Ste Marie, Canada (YAM)",
            "city": "Sault Ste Marie",
            "country": "Canada",
            "iata": "YAM",
            "airport": "Sault Ste Marie Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Sault Ste Marie, US (CIU)",
            "city": "Sault Ste Marie",
            "country": "US",
            "iata": "CIU",
            "airport": "Chippewa County International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Savannah, US (SAV)",
            "city": "Savannah",
            "country": "US",
            "iata": "SAV",
            "airport": "Savissivik Heliport",
            "currency_code": "USD"
          },
          {
            "label": "Savonlinna, Finland (SVL)",
            "city": "Savonlinna",
            "country": "Finland",
            "iata": "SVL",
            "airport": "Savonlinna Airport"
          },
          {
            "label": "Savoonga, US (SVA)",
            "city": "Savoonga",
            "country": "US",
            "iata": "SVA",
            "airport": "Savoonga Airport",
            "currency_code": "USD"
          },
          {
            "label": "Savusavu, Fiji (SVU)",
            "city": "Savusavu",
            "country": "Fiji",
            "iata": "SVU",
            "airport": "Savusavu Airport"
          },
          {
            "label": "Schefferville, Canada (YKL)",
            "city": "Schefferville",
            "country": "Canada",
            "iata": "YKL",
            "airport": "Schefferville Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Scottsbluff, US (BFF)",
            "city": "Scottsbluff",
            "country": "US",
            "iata": "BFF",
            "airport": "Western Neb. Rgnl/William B. Heilig Airport",
            "currency_code": "USD"
          },
          {
            "label": "Scranton/Wilkes Barre, US (AVP)",
            "city": "Scranton/Wilkes Barre",
            "country": "US",
            "iata": "AVP",
            "airport": "Wilkes Barre Scranton International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Sege, Solomon Islands (EGM)",
            "city": "Sege",
            "country": "Solomon Islands",
            "iata": "EGM",
            "airport": "Sege Airport"
          },
          {
            "label": "Seinajoki, Finland (SJY)",
            "city": "Seinajoki",
            "country": "Finland",
            "iata": "SJY",
            "airport": ""
          },
          {
            "label": "Seiyun, Yemen (GXF)",
            "city": "Seiyun",
            "country": "Yemen",
            "iata": "GXF",
            "airport": "Sayun International Airport"
          },
          {
            "label": "Semarang, Indonesia (SRG)",
            "city": "Semarang",
            "country": "Indonesia",
            "iata": "SRG",
            "airport": "Achmad Yani Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Sendai, Japan (SDJ)",
            "city": "Sendai",
            "country": "Japan",
            "iata": "SDJ",
            "airport": "Sendai Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Sept-Iles, Canada (YZV)",
            "city": "Sept-Iles",
            "country": "Canada",
            "iata": "YZV",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Sevilla, Spain (SVQ)",
            "city": "Sevilla",
            "country": "Spain",
            "iata": "SVQ",
            "airport": "Sevilla Airport"
          },
          {
            "label": "Sfax, Tunisia (SFA)",
            "city": "Sfax",
            "country": "Tunisia",
            "iata": "SFA",
            "airport": "Sfax Thyna International Airport"
          },
          {
            "label": "Shamattawa, Canada (ZTM)",
            "city": "Shamattawa",
            "country": "Canada",
            "iata": "ZTM",
            "airport": "Shamattawa Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Shannon, Ireland (SNN)",
            "city": "Shannon",
            "country": "Ireland",
            "iata": "SNN",
            "airport": "Shannon Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Shantou, China (SWA)",
            "city": "Shantou",
            "country": "China",
            "iata": "SWA",
            "airport": "Shantou Waisha Airport"
          },
          {
            "label": "Sharm el Sheikh, Egypt (SSH)",
            "city": "Sharm el Sheikh",
            "country": "Egypt",
            "iata": "SSH",
            "airport": "Sharm El Sheikh International Airport"
          },
          {
            "label": "Sharurah, Saudi Arabia (SHW)",
            "city": "Sharurah",
            "country": "Saudi Arabia",
            "iata": "SHW",
            "airport": "Sharurah Airport"
          },
          {
            "label": "Shenyang, China (SHE)",
            "city": "Shenyang",
            "country": "China",
            "iata": "SHE",
            "airport": "Taoxian Airport"
          },
          {
            "label": "Sheridan, US (SHR)",
            "city": "Sheridan",
            "country": "US",
            "iata": "SHR",
            "airport": "Sheridan County Airport",
            "currency_code": "USD"
          },
          {
            "label": "Shetland Islands, UK (LSI)",
            "city": "Shetland Islands",
            "country": "UK",
            "iata": "LSI",
            "airport": "Sumburgh Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Shijiazhuang, China (SJW)",
            "city": "Shijiazhuang",
            "country": "China",
            "iata": "SJW",
            "airport": "Shijiazhuang Daguocun International Airport"
          },
          {
            "label": "Shillavo, Ethiopia (HIL)",
            "city": "Shillavo",
            "country": "Ethiopia",
            "iata": "HIL",
            "airport": "Shilavo Airport"
          },
          {
            "label": "Shimkent, Kazakhstan (CIT)",
            "city": "Shimkent",
            "country": "Kazakhstan",
            "iata": "CIT",
            "airport": "Shymkent Airport"
          },
          {
            "label": "Shinyanga, Tanzania (SHY)",
            "city": "Shinyanga",
            "country": "Tanzania",
            "iata": "SHY",
            "airport": "Shinyanga Airport"
          },
          {
            "label": "Shirahama, Japan (SHM)",
            "city": "Shirahama",
            "country": "Japan",
            "iata": "SHM",
            "airport": "Nanki Shirahama Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Shishmaref, US (SHH)",
            "city": "Shishmaref",
            "country": "US",
            "iata": "SHH",
            "airport": "Shishmaref Airport",
            "currency_code": "JPY",
          },
          {
            "label": "Shonai, Japan (SYO)",
            "city": "Shonai",
            "country": "Japan",
            "iata": "SYO",
            "airport": "Shonai Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Shreveport, US (SHV)",
            "city": "Shreveport",
            "country": "US",
            "iata": "SHV",
            "airport": "Shreveport Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Sibiu, Romania (SBZ)",
            "city": "Sibiu",
            "country": "Romania",
            "iata": "SBZ",
            "airport": "Sibiu International Airport",
            "currency_code": "RON"
          },
          {
            "label": "Sibu, Malaysia (SBW)",
            "city": "Sibu",
            "country": "Malaysia",
            "iata": "SBW",
            "airport": "Sibu Airport"
          },
          {
            "label": "Siem Reap, Cambodia (REP)",
            "city": "Siem Reap",
            "country": "Cambodia",
            "iata": "REP",
            "airport": "Angkor International Airport"
          },
          {
            "label": "Silver City, US (SVC)",
            "city": "Silver City",
            "country": "US",
            "iata": "SVC",
            "airport": "Grant County Airport",
            "currency_code": "USD"
          },
          {
            "label": "Simao, China (SYM)",
            "city": "Simao",
            "country": "China",
            "iata": "SYM",
            "airport": "Simao Airport"
          },
          {
            "label": "Simara, Nepal (SIF)",
            "city": "Simara",
            "country": "Nepal",
            "iata": "SIF",
            "airport": "Simara Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Simferopol, Ukraine (SIP)",
            "city": "Simferopol",
            "country": "Ukraine",
            "iata": "SIP",
            "airport": "Simferopol International Airport"
          },
          {
            "label": "Simikot, Nepal (IMK)",
            "city": "Simikot",
            "country": "Nepal",
            "iata": "IMK",
            "airport": "Simikot Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Sinop, Brazil (OPS)",
            "city": "Sinop",
            "country": "Brazil",
            "iata": "OPS",
            "airport": ""
          },
          {
            "label": "Sioux City, US (SUX)",
            "city": "Sioux City",
            "country": "US",
            "iata": "SUX",
            "airport": "Sioux Gateway Col. Bud Day Field",
            "currency_code": "USD"
          },
          {
            "label": "Sioux Falls, US (FSD)",
            "city": "Sioux Falls",
            "country": "US",
            "iata": "FSD",
            "airport": "Joe Foss Field Airport",
            "currency_code": "USD"
          },
          {
            "label": "Sioux Lookout, Canada (YXL)",
            "city": "Sioux Lookout",
            "country": "Canada",
            "iata": "YXL",
            "airport": "Sioux Lookout Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Sisimiut, Greenland (JHS)",
            "city": "Sisimiut",
            "country": "Greenland",
            "iata": "JHS",
            "airport": "Sisimiut Airport"
          },
          {
            "label": "Sitia, Greece (JSH)",
            "city": "Sitia",
            "country": "Greece",
            "iata": "JSH",
            "airport": "Sitia Airport"
          },
          {
            "label": "Sitka, US (SIT)",
            "city": "Sitka",
            "country": "US",
            "iata": "SIT",
            "airport": "Sitka Rocky Gutierrez Airport",
            "currency_code": "USD"
          },
          {
            "label": "Sivas, Turkey (VAS)",
            "city": "Sivas",
            "country": "Turkey",
            "iata": "VAS",
            "airport": "Sivas Airport"
          },
          {
            "label": "Skagway, US (SGY)",
            "city": "Skagway",
            "country": "US",
            "iata": "SGY",
            "airport": "Skagway Airport",
            "currency_code": "USD"
          },
          {
            "label": "Skelleftea, Sweden (SFT)",
            "city": "Skelleftea",
            "country": "Sweden",
            "iata": "SFT",
            "airport": ""
          },
          {
            "label": "Skiathos, Greece (JSI)",
            "city": "Skiathos",
            "country": "Greece",
            "iata": "JSI",
            "airport": "Skiathos Island National Airport"
          },
          {
            "label": "Skien, Norway (SKE)",
            "city": "Skien",
            "country": "Norway",
            "iata": "SKE",
            "airport": "Skien Airport"
          },
          {
            "label": "Skiros, Greece (SKU)",
            "city": "Skiros",
            "country": "Greece",
            "iata": "SKU",
            "airport": "Skiros Airport"
          },
          {
            "label": "Skopje, Macedonia (SKP)",
            "city": "Skopje",
            "country": "Macedonia",
            "iata": "SKP",
            "airport": "Skopje Alexander the Great Airport"
          },
          {
            "label": "SkÃƒÂ¶vde, Sweden (KVB)",
            "city": "SkÃƒÂ¶vde",
            "country": "Sweden",
            "iata": "KVB",
            "airport": ""
          },
          {
            "label": "Sliac, Slovakia (SLD)",
            "city": "Sliac",
            "country": "Slovakia",
            "iata": "SLD",
            "airport": "Sliac Airport"
          },
          {
            "label": "Sligo, Ireland (SXL)",
            "city": "Sligo",
            "country": "Ireland",
            "iata": "SXL",
            "airport": "Sligo Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Smith Falls, Canada (YSH)",
            "city": "Smith Falls",
            "country": "Canada",
            "iata": "YSH",
            "airport": "Smiths Falls-Montague (Russ Beach) Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Smithers, Canada (YYD)",
            "city": "Smithers",
            "country": "Canada",
            "iata": "YYD",
            "airport": "Smithers Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Soalala, Madagascar (DWB)",
            "city": "Soalala",
            "country": "Madagascar",
            "iata": "DWB",
            "airport": "Soalala Airport"
          },
          {
            "label": "Socotra, Yemen (SCT)",
            "city": "Socotra",
            "country": "Yemen",
            "iata": "SCT",
            "airport": "Socotra International Airport"
          },
          {
            "label": "Soderhamn, Sweden (SOO)",
            "city": "Soderhamn",
            "country": "Sweden",
            "iata": "SOO",
            "airport": ""
          },
          {
            "label": "Sofia, Bulgaria (SOF)",
            "city": "Sofia",
            "country": "Bulgaria",
            "iata": "SOF",
            "airport": "Sofia Airport"
          },
          {
            "label": "Sogndal, Norway (SOG)",
            "city": "Sogndal",
            "country": "Norway",
            "iata": "SOG",
            "airport": "Sogndal Airport"
          },
          {
            "label": "Sola, Vanuatu (SLH)",
            "city": "Sola",
            "country": "Vanuatu",
            "iata": "SLH",
            "airport": "Sola Airport"
          },
          {
            "label": "Solo City, Indonesia (SOC)",
            "city": "Solo City",
            "country": "Indonesia",
            "iata": "SOC",
            "airport": "Adi Sumarmo Wiryokusumo Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Solovetsky, Russia (CSH)",
            "city": "Solovetsky",
            "country": "Russia",
            "iata": "CSH",
            "airport": "Solovki Airport"
          },
          {
            "label": "Sonderborg, Denmark (SGD)",
            "city": "Sonderborg",
            "country": "Denmark",
            "iata": "SGD",
            "airport": ""
          },
          {
            "label": "Song Pan, China (JZH)",
            "city": "Song Pan",
            "country": "China",
            "iata": "JZH",
            "airport": "Jiuzhai Huanglong Airport"
          },
          {
            "label": "Sorkjosen, Norway (SOJ)",
            "city": "Sorkjosen",
            "country": "Norway",
            "iata": "SOJ",
            "airport": ""
          },
          {
            "label": "Sorong, Indonesia (SOQ)",
            "city": "Sorong",
            "country": "Indonesia",
            "iata": "SOQ",
            "airport": "Sorong (Jefman) Airport",
            "currency_code": "IDR"
          },
          {
            "label": "South Bend, US (SBN)",
            "city": "South Bend",
            "country": "US",
            "iata": "SBN",
            "airport": "South Bend Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "South West Bay, Vanuatu (SWJ)",
            "city": "South West Bay",
            "country": "Vanuatu",
            "iata": "SWJ",
            "airport": "Southwest Bay Airport"
          },
          {
            "label": "Southampton, UK (SOU)",
            "city": "Southampton",
            "country": "UK",
            "iata": "SOU",
            "airport": "Southampton Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Southend, UK (SEN)",
            "city": "Southend",
            "country": "UK",
            "iata": "SEN",
            "airport": "Southend Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Split, Croatia (SPU)",
            "city": "Split",
            "country": "Croatia",
            "iata": "SPU",
            "airport": "Split Airport"
          },
          {
            "label": "Spokane, US (GEG)",
            "city": "Spokane",
            "country": "US",
            "iata": "GEG",
            "airport": "Spokane International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Springfield, US (SGF)",
            "city": "Springfield",
            "country": "US",
            "iata": "SGF",
            "airport": "Springfield Branson National Airport",
            "currency_code": "USD"
          },
          {
            "label": "Springfield, US (SPI)",
            "city": "Springfield",
            "country": "US",
            "iata": "SPI",
            "airport": "Abraham Lincoln Capital Airport",
            "currency_code": "USD"
          },
          {
            "label": "St Andrews, UK (ADX)",
            "city": "St Andrews",
            "country": "UK",
            "iata": "ADX",
            "airport": "RAF Leuchars",
            "currency_code": "GBP"
          },
          {
            "label": "St Anthony, Canada (YAY)",
            "city": "St Anthony",
            "country": "Canada",
            "iata": "YAY",
            "airport": "St Anthony Airport",
            "currency_code": "CAD"
          },
          {
            "label": "St George, Australia (SGO)",
            "city": "St George",
            "country": "Australia",
            "iata": "SGO",
            "airport": "St George Airport",
            "currency_code": "AUD"
          },
          {
            "label": "St Louis, US (STL)",
            "city": "St Louis",
            "country": "US",
            "iata": "STL",
            "airport": "Lambert St Louis International Airport",
            "currency_code": "USD"
          },
          {
            "label": "St Nazaire, France (SNR)",
            "city": "St Nazaire",
            "country": "France",
            "iata": "SNR",
            "airport": "Saint-Nazaire-Montoir Airport"
          },
          {
            "label": "St Pierre, Saint Pierre and Miquelon (FSP)",
            "city": "St Pierre",
            "country": "Saint Pierre and Miquelon",
            "iata": "FSP",
            "airport": "St Pierre Airport"
          },
          {
            "label": "State College, US (SCE)",
            "city": "State College",
            "country": "US",
            "iata": "SCE",
            "airport": "University Park Airport",
            "currency_code": "USD"
          },
          {
            "label": "Staunton, US (SHD)",
            "city": "Staunton",
            "country": "US",
            "iata": "SHD",
            "airport": "Shenandoah Valley Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Stavanger, Norway (SVG)",
            "city": "Stavanger",
            "country": "Norway",
            "iata": "SVG",
            "airport": "Stavanger Airport, Sola"
          },
          {
            "label": "Stavropol, Russia (STW)",
            "city": "Stavropol",
            "country": "Russia",
            "iata": "STW",
            "airport": "Stavropol Shpakovskoye Airport"
          },
          {
            "label": "Ste Therese Point, Canada (YST)",
            "city": "Ste Therese Point",
            "country": "Canada",
            "iata": "YST",
            "airport": "St. Theresa Point Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Stephenville, Canada (YJT)",
            "city": "Stephenville",
            "country": "Canada",
            "iata": "YJT",
            "airport": "Stephenville Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Stokmarknes, Norway (SKN)",
            "city": "Stokmarknes",
            "country": "Norway",
            "iata": "SKN",
            "airport": "Stokmarknes Skagen Airport"
          },
          {
            "label": "Stord, Norway (SRP)",
            "city": "Stord",
            "country": "Norway",
            "iata": "SRP",
            "airport": "Stord Airport"
          },
          {
            "label": "Stornoway, UK (SYY)",
            "city": "Stornoway",
            "country": "UK",
            "iata": "SYY",
            "airport": "Stornoway Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Storuman, Sweden (SQO)",
            "city": "Storuman",
            "country": "Sweden",
            "iata": "SQO",
            "airport": "Storuman Airport"
          },
          {
            "label": "Strasbourg, France (SXB)",
            "city": "Strasbourg",
            "country": "France",
            "iata": "SXB",
            "airport": "Strasbourg Airport"
          },
          {
            "label": "Suavanao, Solomon Islands (VAO)",
            "city": "Suavanao",
            "country": "Solomon Islands",
            "iata": "VAO",
            "airport": "Suavanao Airport"
          },
          {
            "label": "Suceava, Romania (SCV)",
            "city": "Suceava",
            "country": "Romania",
            "iata": "SCV",
            "airport": "Suceava Stefan cel Mare Airport",
            "currency_code": "RON"
          },
          {
            "label": "Sucre, Bolivia (SRE)",
            "city": "Sucre",
            "country": "Bolivia",
            "iata": "SRE",
            "airport": "Juana Azurduy De Padilla Airport"
          },
          {
            "label": "Sudbury, Canada (YSB)",
            "city": "Sudbury",
            "country": "Canada",
            "iata": "YSB",
            "airport": "Sudbury Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Sue Island, Australia (SYU)",
            "city": "Sue Island",
            "country": "Australia",
            "iata": "SYU",
            "airport": "Warraber Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Sukhothai, Thailand (THS)",
            "city": "Sukhothai",
            "country": "Thailand",
            "iata": "THS",
            "airport": "Sukhothai Airport",
            "currency_code": "THB"
          },
          {
            "label": "Suki, Papua New Guinea (SKC)",
            "city": "Suki",
            "country": "Papua New Guinea",
            "iata": "SKC",
            "airport": "Suki Airport"
          },
          {
            "label": "Summer Beaver, Canada (SUR)",
            "city": "Summer Beaver",
            "country": "Canada",
            "iata": "SUR",
            "airport": "Summer Beaver Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Sundsvall, Sweden (SDL)",
            "city": "Sundsvall",
            "country": "Sweden",
            "iata": "SDL",
            "airport": ""
          },
          {
            "label": "Sunshine Coast, Australia (MCY)",
            "city": "Sunshine Coast",
            "country": "Australia",
            "iata": "MCY",
            "airport": "Sunshine Coast Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Surabaya, Indonesia (SUB)",
            "city": "Surabaya",
            "country": "Indonesia",
            "iata": "SUB",
            "airport": "Juanda International Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Surat Thani, Thailand (URT)",
            "city": "Surat Thani",
            "country": "Thailand",
            "iata": "URT",
            "airport": "Surat Thani Airport",
            "currency_code": "THB"
          },
          {
            "label": "Surgut, Russia (SGC)",
            "city": "Surgut",
            "country": "Russia",
            "iata": "SGC",
            "airport": "Surgut Airport"
          },
          {
            "label": "Surigao, Philippines (SUG)",
            "city": "Surigao",
            "country": "Philippines",
            "iata": "SUG",
            "airport": "Surigao Airport"
          },
          {
            "label": "Surkhet, Nepal (SKH)",
            "city": "Surkhet",
            "country": "Nepal",
            "iata": "SKH",
            "airport": "Surkhet Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Suva, Fiji (SUV)",
            "city": "Suva",
            "country": "Fiji",
            "iata": "SUV",
            "airport": "Nausori International Airport"
          },
          {
            "label": "Sveg, Sweden (EVG)",
            "city": "Sveg",
            "country": "Sweden",
            "iata": "EVG",
            "airport": "Sveg Airport"
          },
          {
            "label": "Svolvaer, Norway (SVJ)",
            "city": "Svolvaer",
            "country": "Norway",
            "iata": "SVJ",
            "airport": ""
          },
          {
            "label": "Swansea, UK (SWS)",
            "city": "Swansea",
            "country": "UK",
            "iata": "SWS",
            "airport": "Swansea Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Syktyvkar, Russia (SCW)",
            "city": "Syktyvkar",
            "country": "Russia",
            "iata": "SCW",
            "airport": "Syktyvkar Airport"
          },
          {
            "label": "Sylhet, Bangladesh (ZYL)",
            "city": "Sylhet",
            "country": "Bangladesh",
            "iata": "ZYL",
            "airport": "Osmany International Airport",
            "currency_code": "BDT"
          },
          {
            "label": "Syracuse, US (SYR)",
            "city": "Syracuse",
            "country": "US",
            "iata": "SYR",
            "airport": "Syracuse Hancock International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Syros Island, Greece (JSY)",
            "city": "Syros Island",
            "country": "Greece",
            "iata": "JSY",
            "airport": "Syros Airport"
          },
          {
            "label": "Szczecin, Poland (SZZ)",
            "city": "Szczecin",
            "country": "Poland",
            "iata": "SZZ",
            "airport": ""
          },
          {
            "label": "Taba, Egypt (TCP)",
            "city": "Taba",
            "country": "Egypt",
            "iata": "TCP",
            "airport": "Taba International Airport"
          },
          {
            "label": "Tabubil, Papua New Guinea (TBG)",
            "city": "Tabubil",
            "country": "Papua New Guinea",
            "iata": "TBG",
            "airport": "Tabubil Airport"
          },
          {
            "label": "Tabuk, Saudi Arabia (TUU)",
            "city": "Tabuk",
            "country": "Saudi Arabia",
            "iata": "TUU",
            "airport": "Tabuk Airport"
          },
          {
            "label": "Tacheng, China (TCG)",
            "city": "Tacheng",
            "country": "China",
            "iata": "TCG",
            "airport": "Tocache Airport"
          },
          {
            "label": "Tacloban City, Philippines (TAC)",
            "city": "Tacloban City",
            "country": "Philippines",
            "iata": "TAC",
            "airport": "Daniel Z. Romualdez Airport"
          },
          {
            "label": "Tacna, Peru (TCQ)",
            "city": "Tacna",
            "country": "Peru",
            "iata": "TCQ",
            "airport": "Coronel FAP Carlos Ciriani Santa Rosa International Airport"
          },
          {
            "label": "Tadoule Lake, Canada (XTL)",
            "city": "Tadoule Lake",
            "country": "Canada",
            "iata": "XTL",
            "airport": "Tadoule Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Tagbilaran, Philippines (TAG)",
            "city": "Tagbilaran",
            "country": "Philippines",
            "iata": "TAG",
            "airport": "Tagbilaran Airport"
          },
          {
            "label": "Taichung, Taiwan (RMQ)",
            "city": "Taichung",
            "country": "Taiwan",
            "iata": "RMQ",
            "airport": "Taichung Ching Chuang Kang Airport"
          },
          {
            "label": "Taif, Saudi Arabia (TIF)",
            "city": "Taif",
            "country": "Saudi Arabia",
            "iata": "TIF",
            "airport": "Taif Airport"
          },
          {
            "label": "Tainan, Taiwan (TNN)",
            "city": "Tainan",
            "country": "Taiwan",
            "iata": "TNN",
            "airport": "Tainan Airport"
          },
          {
            "label": "Taitung, Taiwan (TTT)",
            "city": "Taitung",
            "country": "Taiwan",
            "iata": "TTT",
            "airport": "Taitung Airport"
          },
          {
            "label": "Taiyuan, China (TYN)",
            "city": "Taiyuan",
            "country": "China",
            "iata": "TYN",
            "airport": "Taiyuan Wusu Airport"
          },
          {
            "label": "Taiz, Yemen (TAI)",
            "city": "Taiz",
            "country": "Yemen",
            "iata": "TAI",
            "airport": "Ta'izz International Airport"
          },
          {
            "label": "Takamatsu, Japan (TAK)",
            "city": "Takamatsu",
            "country": "Japan",
            "iata": "TAK",
            "airport": "Takamatsu Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Talara, Peru (TYL)",
            "city": "Talara",
            "country": "Peru",
            "iata": "TYL",
            "airport": "Capitan Montes Airport"
          },
          {
            "label": "Tallahassee, US (TLH)",
            "city": "Tallahassee",
            "country": "US",
            "iata": "TLH",
            "airport": "Tallahassee Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Tallinn, Estonia (TLL)",
            "city": "Tallinn",
            "country": "Estonia",
            "iata": "TLL",
            "airport": "Tallinn Airport"
          },
          {
            "label": "Taloyoak, Canada (YYH)",
            "city": "Taloyoak",
            "country": "Canada",
            "iata": "YYH",
            "airport": "Taloyoak Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Tamatave, Madagascar (TMM)",
            "city": "Tamatave",
            "country": "Madagascar",
            "iata": "TMM",
            "airport": "Toamasina Airport"
          },
          {
            "label": "Tambacounda, Senegal (TUD)",
            "city": "Tambacounda",
            "country": "Senegal",
            "iata": "TUD",
            "airport": "Tambacounda Airport"
          },
          {
            "label": "Tambolaka, Indonesia (TMC)",
            "city": "Tambolaka",
            "country": "Indonesia",
            "iata": "TMC",
            "airport": "Tambolaka Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Tambov, Russia (TBW)",
            "city": "Tambov",
            "country": "Russia",
            "iata": "TBW",
            "airport": "Donskoye Airport"
          },
          {
            "label": "Tame, Colombia (TME)",
            "city": "Tame",
            "country": "Colombia",
            "iata": "TME",
            "airport": "Gustavo Vargas Airport",
            "currency_code": "COP"
          },
          {
            "label": "Tamky, Vietnam (VCL)",
            "city": "Tamky",
            "country": "Vietnam",
            "iata": "VCL",
            "airport": "Chu Lai International Airport"
          },
          {
            "label": "Tampere, Finland (TMP)",
            "city": "Tampere",
            "country": "Finland",
            "iata": "TMP",
            "airport": "Tampere-Pirkkala Airport"
          },
          {
            "label": "Tampico, Mexico (TAM)",
            "city": "Tampico",
            "country": "Mexico",
            "iata": "TAM",
            "airport": "General Francisco Javier Mina International Airport"
          },
          {
            "label": "Tamworth, Australia (TMW)",
            "city": "Tamworth",
            "country": "Australia",
            "iata": "TMW",
            "airport": "Tamworth Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Tan Tan, Morocco (TTA)",
            "city": "Tan Tan",
            "country": "Morocco",
            "iata": "TTA",
            "airport": "Tan Tan Airport"
          },
          {
            "label": "Tangier, Morocco (TNG)",
            "city": "Tangier",
            "country": "Morocco",
            "iata": "TNG",
            "airport": "Ibn Batouta Airport"
          },
          {
            "label": "Tanjung Pandan, Indonesia (TJQ)",
            "city": "Tanjung Pandan",
            "country": "Indonesia",
            "iata": "TJQ",
            "airport": "Buluh Tumbang (H A S Hanandjoeddin) Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Tanjung Warukin, New Caledonia (TJG)",
            "city": "Tanjung Warukin",
            "country": "New Caledonia",
            "iata": "TJG",
            "airport": "Warukin Airport"
          },
          {
            "label": "Tanna, Vanuatu (TAH)",
            "city": "Tanna",
            "country": "Vanuatu",
            "iata": "TAH",
            "airport": "Tanna Airport"
          },
          {
            "label": "Tapachula, Mexico (TAP)",
            "city": "Tapachula",
            "country": "Mexico",
            "iata": "TAP",
            "airport": "Tapachula International Airport"
          },
          {
            "label": "Taplejung, Nepal (TPJ)",
            "city": "Taplejung",
            "country": "Nepal",
            "iata": "TPJ",
            "airport": "Taplejung Airport",
            "currency_code": "NPR"
          },
          {
            "label": "Tarakan, Indonesia (TRK)",
            "city": "Tarakan",
            "country": "Indonesia",
            "iata": "TRK",
            "airport": "Juwata Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Tarapoto, Peru (TPP)",
            "city": "Tarapoto",
            "country": "Peru",
            "iata": "TPP",
            "airport": "Cadete FAP Guillermo Del Castillo Paredes Airport"
          },
          {
            "label": "Tarawa, Kiribati (TRW)",
            "city": "Tarawa",
            "country": "Kiribati",
            "iata": "TRW",
            "airport": "Bonriki International Airport"
          },
          {
            "label": "Tarcoola, Australia (TAQ)",
            "city": "Tarcoola",
            "country": "Australia",
            "iata": "TAQ",
            "airport": "Tarcoola Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Taree, Australia (TRO)",
            "city": "Taree",
            "country": "Australia",
            "iata": "TRO",
            "airport": "Taree Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Tari, Papua New Guinea (TIZ)",
            "city": "Tari",
            "country": "Papua New Guinea",
            "iata": "TIZ",
            "airport": "Tari Airport"
          },
          {
            "label": "Tarija, Bolivia (TJA)",
            "city": "Tarija",
            "country": "Bolivia",
            "iata": "TJA",
            "airport": "Capitan Oriel Lea Plaza Airport"
          },
          {
            "label": "Tasiilaq, Greenland (AGM)",
            "city": "Tasiilaq",
            "country": "Greenland",
            "iata": "AGM",
            "airport": "Tasiilaq Heliport"
          },
          {
            "label": "Tasiujuaq, Canada (YTQ)",
            "city": "Tasiujuaq",
            "country": "Canada",
            "iata": "YTQ",
            "airport": "Tasiujaq Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Tatalina, US (TLJ)",
            "city": "Tatalina",
            "country": "US",
            "iata": "TLJ",
            "airport": "Tatalina LRRS Airport",
            "currency_code": "USD"
          },
          {
            "label": "Taupo, New Zealand (TUO)",
            "city": "Taupo",
            "country": "New Zealand",
            "iata": "TUO",
            "airport": "Taupo Airport"
          },
          {
            "label": "Tauranga, New Zealand (TRG)",
            "city": "Tauranga",
            "country": "New Zealand",
            "iata": "TRG",
            "airport": "Tauranga Airport"
          },
          {
            "label": "Taveuni, Fiji (TVU)",
            "city": "Taveuni",
            "country": "Fiji",
            "iata": "TVU",
            "airport": "Matei Airport"
          },
          {
            "label": "Tawau, Malaysia (TWU)",
            "city": "Tawau",
            "country": "Malaysia",
            "iata": "TWU",
            "airport": "Tawau Airport"
          },
          {
            "label": "Tchibanga, Gabon (TCH)",
            "city": "Tchibanga",
            "country": "Gabon",
            "iata": "TCH",
            "airport": "Tchibanga Airport"
          },
          {
            "label": "Teesside, UK (MME)",
            "city": "Teesside",
            "country": "UK",
            "iata": "MME",
            "airport": "Durham Tees Valley Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Tembagapura, Indonesia (TIM)",
            "city": "Tembagapura",
            "country": "Indonesia",
            "iata": "TIM",
            "airport": "Moses Kilangin Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Temuco, Chile (ZCO)",
            "city": "Temuco",
            "country": "Chile",
            "iata": "ZCO",
            "airport": "Maquehue Airport"
          },
          {
            "label": "Tenerife, Spain (TFN)",
            "city": "Tenerife",
            "country": "Spain",
            "iata": "TFN",
            "airport": "Tenerife Norte Airport"
          },
          {
            "label": "Tenerife, Spain (TFS)",
            "city": "Tenerife",
            "country": "Spain",
            "iata": "TFS",
            "airport": "Tenerife South Airport"
          },
          {
            "label": "Tepic, Mexico (TPQ)",
            "city": "Tepic",
            "country": "Mexico",
            "iata": "TPQ",
            "airport": "Amado Nervo National Airport"
          },
          {
            "label": "Terceira Island, Portugal (TER)",
            "city": "Terceira Island",
            "country": "Portugal",
            "iata": "TER",
            "airport": "Lajes Field"
          },
          {
            "label": "Teresina, Brazil (THE)",
            "city": "Teresina",
            "country": "Brazil",
            "iata": "THE",
            "airport": ""
          },
          {
            "label": "Termez, Uzbekistan (TMJ)",
            "city": "Termez",
            "country": "Uzbekistan",
            "iata": "TMJ",
            "airport": "Termez Airport"
          },
          {
            "label": "Ternate, Indonesia (TTE)",
            "city": "Ternate",
            "country": "Indonesia",
            "iata": "TTE",
            "airport": "Sultan Khairun Babullah Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Terrace, Canada (YXT)",
            "city": "Terrace",
            "country": "Canada",
            "iata": "YXT",
            "airport": "Terrace Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Tete, Mozambique (TET)",
            "city": "Tete",
            "country": "Mozambique",
            "iata": "TET",
            "airport": "Chingozi Airport"
          },
          {
            "label": "Tete-a-La Baleine, Canada (ZTB)",
            "city": "Tete-a-La Baleine",
            "country": "Canada",
            "iata": "ZTB",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Tetouan, Morocco (TTU)",
            "city": "Tetouan",
            "country": "Morocco",
            "iata": "TTU",
            "airport": "Saniat Rmel Airport"
          },
          {
            "label": "Texarkana, US (TXK)",
            "city": "Texarkana",
            "country": "US",
            "iata": "TXK",
            "airport": "Texarkana Regional Webb Field",
            "currency_code": "USD"
          },
          {
            "label": "Thargomindah, Australia (XTG)",
            "city": "Thargomindah",
            "country": "Australia",
            "iata": "XTG",
            "airport": "Thargomindah Airport",
            "currency_code": "AUD"
          },
          {
            "label": "The Pas, Canada (YQD)",
            "city": "The Pas",
            "country": "Canada",
            "iata": "YQD",
            "airport": "The Pas Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Thessaloniki, Greece (SKG)",
            "city": "Thessaloniki",
            "country": "Greece",
            "iata": "SKG",
            "airport": "Thessaloniki Macedonia International Airport"
          },
          {
            "label": "Thicket Portage, Canada (YTD)",
            "city": "Thicket Portage",
            "country": "Canada",
            "iata": "YTD",
            "airport": "Thicket Portage Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Thira - Santorini, Greece (JTR)",
            "city": "Thira",
            "country": "Greece",
            "iata": "JTR",
            "airport": "Santorini Airport"
          },
          {
            "label": "Thira, Greece (JTR)",
            "city": "Thira",
            "country": "Greece",
            "iata": "JTR",
            "airport": "Santorini Airport"
          },
          {
            "label": "Thompson, Canada (YTH)",
            "city": "Thompson",
            "country": "Canada",
            "iata": "YTH",
            "airport": "Thompson Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Thorshofn, Iceland (THO)",
            "city": "Thorshofn",
            "country": "Iceland",
            "iata": "THO",
            "airport": "",
            "currency_code": "ISK"
          },
          {
            "label": "Thunder Bay, Canada (YQT)",
            "city": "Thunder Bay",
            "country": "Canada",
            "iata": "YQT",
            "airport": "Thunder Bay Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Tianjin, China (TSN)",
            "city": "Tianjin",
            "country": "China",
            "iata": "TSN",
            "airport": "Tianjin Binhai International Airport"
          },
          {
            "label": "Tiga, New Caledonia (TGJ)",
            "city": "Tiga",
            "country": "New Caledonia",
            "iata": "TGJ",
            "airport": "Tiga Airport"
          },
          {
            "label": "Tijuana, Mexico (TIJ)",
            "city": "Tijuana",
            "country": "Mexico",
            "iata": "TIJ",
            "airport": ""
          },
          {
            "label": "Tiksi, Russia (IKS)",
            "city": "Tiksi",
            "country": "Russia",
            "iata": "IKS",
            "airport": "Tiksi Airport"
          },
          {
            "label": "Timaru, New Zealand (TIU)",
            "city": "Timaru",
            "country": "New Zealand",
            "iata": "TIU",
            "airport": "Timaru Airport"
          },
          {
            "label": "Timisoara, Romania (TSR)",
            "city": "Timisoara",
            "country": "Romania",
            "iata": "TSR",
            "airport": "Timisoara Traian Vuia Airport",
            "currency_code": "RON"
          },
          {
            "label": "Timmins, Canada (YTS)",
            "city": "Timmins",
            "country": "Canada",
            "iata": "YTS",
            "airport": "Timmins/Victor M. Power",
            "currency_code": "CAD"
          },
          {
            "label": "Tinian, Northern Mariana Islands (TIQ)",
            "city": "Tinian",
            "country": "Northern Mariana Islands",
            "iata": "TIQ",
            "airport": "Tinian International Airport"
          },
          {
            "label": "Tioman, Malaysia (TOD)",
            "city": "Tioman",
            "country": "Malaysia",
            "iata": "TOD",
            "airport": "Pulau Tioman Airport"
          },
          {
            "label": "Tiree, UK (TRE)",
            "city": "Tiree",
            "country": "UK",
            "iata": "TRE",
            "airport": "Tiree Airport",
            "currency_code": "GBP"
          },
          {
            "label": "Tirgu Mures, Romania (TGM)",
            "city": "Tirgu Mures",
            "country": "Romania",
            "iata": "TGM",
            "airport": "",
            "currency_code": "RON"
          },
          {
            "label": "Tivat, Montenegro (TIV)",
            "city": "Tivat",
            "country": "Montenegro",
            "iata": "TIV",
            "airport": "Tivat Airport"
          },
          {
            "label": "Togiak Village, US (TOG)",
            "city": "Togiak Village",
            "country": "US",
            "iata": "TOG",
            "airport": "Togiak Airport",
            "currency_code": "USD"
          },
          {
            "label": "Tok, US (TKJ)",
            "city": "Tok",
            "country": "US",
            "iata": "TKJ",
            "airport": "Tok Airport",
            "currency_code": "USD"
          },
          {
            "label": "Tokunoshima, Japan (TKN)",
            "city": "Tokunoshima",
            "country": "Japan",
            "iata": "TKN",
            "airport": "Tokunoshima Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Tokushima, Japan (TKS)",
            "city": "Tokushima",
            "country": "Japan",
            "iata": "TKS",
            "airport": "Tokushima Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Toledo, US (TOL)",
            "city": "Toledo",
            "country": "US",
            "iata": "TOL",
            "airport": "Toledo Express Airport",
            "currency_code": "USD"
          },
          {
            "label": "Toluca, Mexico (TLC)",
            "city": "Toluca",
            "country": "Mexico",
            "iata": "TLC",
            "airport": "Licenciado Adolfo Lopez Mateos International Airport"
          },
          {
            "label": "Tombouctou, Mali (TOM)",
            "city": "Tombouctou",
            "country": "Mali",
            "iata": "TOM",
            "airport": "Timbuktu Airport"
          },
          {
            "label": "Tomsk, Russia (TOF)",
            "city": "Tomsk",
            "country": "Russia",
            "iata": "TOF",
            "airport": "Bogashevo Airport"
          },
          {
            "label": "Tongliao, China (TGO)",
            "city": "Tongliao",
            "country": "China",
            "iata": "TGO",
            "airport": "Tongliao Airport"
          },
          {
            "label": "Tongoa, Vanuatu (TGH)",
            "city": "Tongoa",
            "country": "Vanuatu",
            "iata": "TGH",
            "airport": "Tongoa Island Airport"
          },
          {
            "label": "Toowoomba, Australia (TWB)",
            "city": "Toowoomba",
            "country": "Australia",
            "iata": "TWB",
            "airport": "Toowoomba Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Torreon, Mexico (TRC)",
            "city": "Torreon",
            "country": "Mexico",
            "iata": "TRC",
            "airport": "Francisco Sarabia International Airport"
          },
          {
            "label": "Torres, Vanuatu (TOH)",
            "city": "Torres",
            "country": "Vanuatu",
            "iata": "TOH",
            "airport": "Torres Airstrip"
          },
          {
            "label": "Torsby, Sweden (TYF)",
            "city": "Torsby",
            "country": "Sweden",
            "iata": "TYF",
            "airport": "Torsby Airport"
          },
          {
            "label": "Tottori, Japan (TTJ)",
            "city": "Tottori",
            "country": "Japan",
            "iata": "TTJ",
            "airport": "Tottori Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Touho, New Caledonia (TOU)",
            "city": "Touho",
            "country": "New Caledonia",
            "iata": "TOU",
            "airport": "Touho Airport"
          },
          {
            "label": "Toulouse, France (TLS)",
            "city": "Toulouse",
            "country": "France",
            "iata": "TLS",
            "airport": "Toulouse-Blagnac Airport"
          },
          {
            "label": "Townsville, Australia (TSV)",
            "city": "Townsville",
            "country": "Australia",
            "iata": "TSV",
            "airport": "Townsville Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Toyama, Japan (TOY)",
            "city": "Toyama",
            "country": "Japan",
            "iata": "TOY",
            "airport": "Toyama Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Tozeur, Tunisia (TOE)",
            "city": "Tozeur",
            "country": "Tunisia",
            "iata": "TOE",
            "airport": "Tozeur Nefta International Airport"
          },
          {
            "label": "Trabzon, Turkey (TZX)",
            "city": "Trabzon",
            "country": "Turkey",
            "iata": "TZX",
            "airport": "Trabzon International Airport"
          },
          {
            "label": "Trang, Thailand (TST)",
            "city": "Trang",
            "country": "Thailand",
            "iata": "TST",
            "airport": "Trang Airport",
            "currency_code": "THB"
          },
          {
            "label": "Trapani, Italy (TPS)",
            "city": "Trapani",
            "country": "Italy",
            "iata": "TPS",
            "airport": "Trapani / Birgi Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Trat, Thailand (TDX)",
            "city": "Trat",
            "country": "Thailand",
            "iata": "TDX",
            "airport": "Trat Airport",
            "currency_code": "THB"
          },
          {
            "label": "Traverse City, US (TVC)",
            "city": "Traverse City",
            "country": "US",
            "iata": "TVC",
            "airport": "Cherry Capital Airport",
            "currency_code": "USD"
          },
          {
            "label": "Trelew, Argentina (REL)",
            "city": "Trelew",
            "country": "Argentina",
            "iata": "REL",
            "airport": "Almirante Marco Andres Zar Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Trieste, Italy (TRS)",
            "city": "Trieste",
            "country": "Italy",
            "iata": "TRS",
            "airport": "Trieste / Ronchi Dei Legionari",
            "currency_code": "EUR"
          },
          {
            "label": "Trinidad, Bolivia (TDD)",
            "city": "Trinidad",
            "country": "Bolivia",
            "iata": "TDD",
            "airport": "Teniente Av. Jorge Henrich Arauz Airport"
          },
          {
            "label": "Trollhattan, Sweden (THN)",
            "city": "Trollhattan",
            "country": "Sweden",
            "iata": "THN",
            "airport": ""
          },
          {
            "label": "Trombetas, Brazil (TMT)",
            "city": "Trombetas",
            "country": "Brazil",
            "iata": "TMT",
            "airport": "Trombetas Airport"
          },
          {
            "label": "Tromso, Norway (TOS)",
            "city": "Tromso",
            "country": "Norway",
            "iata": "TOS",
            "airport": ""
          },
          {
            "label": "Trondheim, Norway (TRD)",
            "city": "Trondheim",
            "country": "Norway",
            "iata": "TRD",
            "airport": ""
          },
          {
            "label": "Trujillo, Peru (TRU)",
            "city": "Trujillo",
            "country": "Peru",
            "iata": "TRU",
            "airport": "Capitan FAP Carlos Martinez De Pinillos International Airport"
          },
          {
            "label": "Tsiroanomandidy, Madagascar (WTS)",
            "city": "Tsiroanomandidy",
            "country": "Madagascar",
            "iata": "WTS",
            "airport": "Tsiroanomandidy Airport"
          },
          {
            "label": "Tsushima, Japan (TSJ)",
            "city": "Tsushima",
            "country": "Japan",
            "iata": "TSJ",
            "airport": "Tsushima Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Tucson, US (TUS)",
            "city": "Tucson",
            "country": "US",
            "iata": "TUS",
            "airport": "Tucson International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Tucuman, Argentina (TUC)",
            "city": "Tucuman",
            "country": "Argentina",
            "iata": "TUC",
            "airport": "Teniente Benjamin Matienzo Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Tucurui, Brazil (TUR)",
            "city": "Tucurui",
            "country": "Brazil",
            "iata": "TUR",
            "airport": ""
          },
          {
            "label": "Tufi, Papua New Guinea (TFI)",
            "city": "Tufi",
            "country": "Papua New Guinea",
            "iata": "TFI",
            "airport": "Tufi Airport"
          },
          {
            "label": "Tuguegarao City, Philippines (TUG)",
            "city": "Tuguegarao City",
            "country": "Philippines",
            "iata": "TUG",
            "airport": "Tuguegarao Airport"
          },
          {
            "label": "Tuktoyaktuk, Canada (YUB)",
            "city": "Tuktoyaktuk",
            "country": "Canada",
            "iata": "YUB",
            "airport": "Tuktoyaktuk Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Tulcan, Ecuador (TUA)",
            "city": "Tulcan",
            "country": "Ecuador",
            "iata": "TUA",
            "airport": "Teniente Coronel Luis a Mantilla Airport"
          },
          {
            "label": "Tulear, Madagascar (TLE)",
            "city": "Tulear",
            "country": "Madagascar",
            "iata": "TLE",
            "airport": "Toliara Airport"
          },
          {
            "label": "Tulita/Fort Norman, Canada (ZFN)",
            "city": "Tulita/Fort Norman",
            "country": "Canada",
            "iata": "ZFN",
            "airport": "Tulita Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Tulsa, US (TUL)",
            "city": "Tulsa",
            "country": "US",
            "iata": "TUL",
            "airport": "Tulsa International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Tumaco, Colombia (TCO)",
            "city": "Tumaco",
            "country": "Colombia",
            "iata": "TCO",
            "airport": "La Florida Airport",
            "currency_code": "COP"
          },
          {
            "label": "Tumbes, Peru (TBP)",
            "city": "Tumbes",
            "country": "Peru",
            "iata": "TBP",
            "airport": "Capitan FAP Pedro Canga Rodriguez Airport"
          },
          {
            "label": "Tunis, Tunisia (TUN)",
            "city": "Tunis",
            "country": "Tunisia",
            "iata": "TUN",
            "airport": "Tunis Carthage International Airport"
          },
          {
            "label": "Tunxi, China (TXN)",
            "city": "Tunxi",
            "country": "China",
            "iata": "TXN",
            "airport": "Tunxi International Airport"
          },
          {
            "label": "Tupelo, US (TUP)",
            "city": "Tupelo",
            "country": "US",
            "iata": "TUP",
            "airport": "Tupelo Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Turaif, Saudi Arabia (TUI)",
            "city": "Turaif",
            "country": "Saudi Arabia",
            "iata": "TUI",
            "airport": "Turaif Domestic Airport"
          },
          {
            "label": "Turin, Italy (TRN)",
            "city": "Turin",
            "country": "Italy",
            "iata": "TRN",
            "airport": "Torino / Caselle International Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Turku, Finland (TKU)",
            "city": "Turku",
            "country": "Finland",
            "iata": "TKU",
            "airport": "Turku Airport"
          },
          {
            "label": "Tuy Hoa, Vietnam (TBB)",
            "city": "Tuy Hoa",
            "country": "Vietnam",
            "iata": "TBB",
            "airport": "Dong Tac Airport"
          },
          {
            "label": "Twin Falls, US (TWF)",
            "city": "Twin Falls",
            "country": "US",
            "iata": "TWF",
            "airport": "Joslin Field Magic Valley Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Tyler, US (TYR)",
            "city": "Tyler",
            "country": "US",
            "iata": "TYR",
            "airport": "Tyler Pounds Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Tyumen, Russia (TJM)",
            "city": "Tyumen",
            "country": "Russia",
            "iata": "TJM",
            "airport": "Roshchino International Airport"
          },
          {
            "label": "Ube, Japan (UBJ)",
            "city": "Ube",
            "country": "Japan",
            "iata": "UBJ",
            "airport": "Yamaguchi Ube Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Uberaba, Brazil (UBA)",
            "city": "Uberaba",
            "country": "Brazil",
            "iata": "UBA",
            "airport": ""
          },
          {
            "label": "UberlÃƒÂ¢ndia, Brazil (UDI)",
            "city": "UberlÃƒÂ¢ndia",
            "country": "Brazil",
            "iata": "UDI",
            "airport": ""
          },
          {
            "label": "Ubon Ratchathani, Thailand (UBP)",
            "city": "Ubon Ratchathani",
            "country": "Thailand",
            "iata": "UBP",
            "airport": "Ubon Ratchathani Airport",
            "currency_code": "THB"
          },
          {
            "label": "Udon Thani, Thailand (UTH)",
            "city": "Udon Thani",
            "country": "Thailand",
            "iata": "UTH",
            "airport": "Udon Thani Airport",
            "currency_code": "THB"
          },
          {
            "label": "Ufa, Russia (UFA)",
            "city": "Ufa",
            "country": "Russia",
            "iata": "UFA",
            "airport": "Ufa International Airport"
          },
          {
            "label": "Ujung Pandang, Indonesia (UPG)",
            "city": "Ujung Pandang",
            "country": "Indonesia",
            "iata": "UPG",
            "airport": "Hasanuddin International Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Ukhta, Russia (UCT)",
            "city": "Ukhta",
            "country": "Russia",
            "iata": "UCT",
            "airport": "Ukhta Airport"
          },
          {
            "label": "Ulaanbaatar, Mongolia (ULN)",
            "city": "Ulaanbaatar",
            "country": "Mongolia",
            "iata": "ULN",
            "airport": "Chinggis Khaan International Airport"
          },
          {
            "label": "Ulan Ude, Russia (UUD)",
            "city": "Ulan Ude",
            "country": "Russia",
            "iata": "UUD",
            "airport": "Ulan-Ude Airport (Mukhino)"
          },
          {
            "label": "Ulanhot, China (HLH)",
            "city": "Ulanhot",
            "country": "China",
            "iata": "HLH",
            "airport": "Ulanhot Airport"
          },
          {
            "label": "Ulei, Vanuatu (ULB)",
            "city": "Ulei",
            "country": "Vanuatu",
            "iata": "ULB",
            "airport": ""
          },
          {
            "label": "Ulsan, South Korea (USN)",
            "city": "Ulsan",
            "country": "South Korea",
            "iata": "USN",
            "airport": "Ulsan Airport"
          },
          {
            "label": "Ulyanovsk, Russia (ULY)",
            "city": "Ulyanovsk",
            "country": "Russia",
            "iata": "ULY",
            "airport": "Ulyanovsk East Airport"
          },
          {
            "label": "Umea, Sweden (UME)",
            "city": "Umea",
            "country": "Sweden",
            "iata": "UME",
            "airport": ""
          },
          {
            "label": "Umiujaq, Canada (YUD)",
            "city": "Umiujaq",
            "country": "Canada",
            "iata": "YUD",
            "airport": "Umiujaq Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Umtata, South Africa (UTT)",
            "city": "Umtata",
            "country": "South Africa",
            "iata": "UTT",
            "airport": "K. D. Matanzima Airport"
          },
          {
            "label": "Upington, South Africa (UTN)",
            "city": "Upington",
            "country": "South Africa",
            "iata": "UTN",
            "airport": "Pierre Van Ryneveld Airport"
          },
          {
            "label": "Uraj, Russia (URJ)",
            "city": "Uraj",
            "country": "Russia",
            "iata": "URJ",
            "airport": "Uray Airport"
          },
          {
            "label": "Uralsk, Kazakhstan (URA)",
            "city": "Uralsk",
            "country": "Kazakhstan",
            "iata": "URA",
            "airport": "Uralsk Airport"
          },
          {
            "label": "Urgench, Uzbekistan (UGC)",
            "city": "Urgench",
            "country": "Uzbekistan",
            "iata": "UGC",
            "airport": "Urgench Airport"
          },
          {
            "label": "Uruapan, Mexico (UPN)",
            "city": "Uruapan",
            "country": "Mexico",
            "iata": "UPN",
            "airport": "Licenciado y General Ignacio Lopez Rayon Airport"
          },
          {
            "label": "Uruguaiana, Brazil (URG)",
            "city": "Uruguaiana",
            "country": "Brazil",
            "iata": "URG",
            "airport": "Rubem Berta Airport"
          },
          {
            "label": "Urumqi, China (URC)",
            "city": "Urumqi",
            "country": "China",
            "iata": "URC",
            "airport": ""
          },
          {
            "label": "Usak, Turkey (USQ)",
            "city": "Usak",
            "country": "Turkey",
            "iata": "USQ",
            "airport": "Usak Airport"
          },
          {
            "label": "Ushuaia, Argentina (USH)",
            "city": "Ushuaia",
            "country": "Argentina",
            "iata": "USH",
            "airport": "Malvinas Argentinas Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Usinsk, Russia (USK)",
            "city": "Usinsk",
            "country": "Russia",
            "iata": "USK",
            "airport": "Usinsk Airport"
          },
          {
            "label": "Ust-kamenogorsk, Kazakhstan (UKK)",
            "city": "Ust-kamenogorsk",
            "country": "Kazakhstan",
            "iata": "UKK",
            "airport": "Ukkusissat Heliport"
          },
          {
            "label": "Utapao, Thailand (UTP)",
            "city": "Utapao",
            "country": "Thailand",
            "iata": "UTP",
            "airport": "U-Tapao International Airport",
            "currency_code": "THB"
          },
          {
            "label": "Uummannaq, Greenland (UMD)",
            "city": "Uummannaq",
            "country": "Greenland",
            "iata": "UMD",
            "airport": "Uummannaq Heliport"
          },
          {
            "label": "Uzhgorod, Ukraine (UDJ)",
            "city": "Uzhgorod",
            "country": "Ukraine",
            "iata": "UDJ",
            "airport": "Uzhhorod International Airport"
          },
          {
            "label": "Vaasa, Finland (VAA)",
            "city": "Vaasa",
            "country": "Finland",
            "iata": "VAA",
            "airport": "Vaasa Airport"
          },
          {
            "label": "Vadso, Norway (VDS)",
            "city": "Vadso",
            "country": "Norway",
            "iata": "VDS",
            "airport": ""
          },
          {
            "label": "Vaeroy, Norway (VRY)",
            "city": "Vaeroy",
            "country": "Norway",
            "iata": "VRY",
            "airport": ""
          },
          {
            "label": "Vail/Eagle, US (EGE)",
            "city": "Vail/Eagle",
            "country": "US",
            "iata": "EGE",
            "airport": "Eagle County Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Val d'Or, Canada (YVO)",
            "city": "Val d'Or",
            "country": "Canada",
            "iata": "YVO",
            "airport": "Val-d'Or Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Valdez, US (VDZ)",
            "city": "Valdez",
            "country": "US",
            "iata": "VDZ",
            "airport": "Valdez Pioneer Field",
            "currency_code": "USD"
          },
          {
            "label": "Valdivia, Chile (ZAL)",
            "city": "Valdivia",
            "country": "Chile",
            "iata": "ZAL",
            "airport": "Pichoy Airport"
          },
          {
            "label": "Valdosta, US (VLD)",
            "city": "Valdosta",
            "country": "US",
            "iata": "VLD",
            "airport": "Valdosta Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Valencia, Spain (VLC)",
            "city": "Valencia",
            "country": "Spain",
            "iata": "VLC",
            "airport": "Valencia Airport"
          },
          {
            "label": "Valencia, Venezuela (VLN)",
            "city": "Valencia",
            "country": "Venezuela",
            "iata": "VLN",
            "airport": "Arturo Michelena International Airport"
          },
          {
            "label": "Valera, Venezuela (VLV)",
            "city": "Valera",
            "country": "Venezuela",
            "iata": "VLV",
            "airport": ""
          },
          {
            "label": "Valesdir, Vanuatu (VLS)",
            "city": "Valesdir",
            "country": "Vanuatu",
            "iata": "VLS",
            "airport": "Valesdir Airport"
          },
          {
            "label": "Valladolid, Spain (VLL)",
            "city": "Valladolid",
            "country": "Spain",
            "iata": "VLL",
            "airport": "Valladolid Airport"
          },
          {
            "label": "Valledupar, Colombia (VUP)",
            "city": "Valledupar",
            "country": "Colombia",
            "iata": "VUP",
            "airport": "",
            "currency_code": "COP"
          },
          {
            "label": "Valparaiso, US (VPS)",
            "city": "Valparaiso",
            "country": "US",
            "iata": "VPS",
            "airport": "Eglin Air Force Base",
            "currency_code": "USD"
          },
          {
            "label": "Valverde, Spain (VDE)",
            "city": "Valverde",
            "country": "Spain",
            "iata": "VDE",
            "airport": "Hierro Airport"
          },
          {
            "label": "Van, Turkey (VAN)",
            "city": "Van",
            "country": "Turkey",
            "iata": "VAN",
            "airport": "Van Ferit Melen Airport"
          },
          {
            "label": "Vanimo, Papua New Guinea (VAI)",
            "city": "Vanimo",
            "country": "Papua New Guinea",
            "iata": "VAI",
            "airport": "Vanimo Airport"
          },
          {
            "label": "Vanuabalavu, Fiji (VBV)",
            "city": "Vanuabalavu",
            "country": "Fiji",
            "iata": "VBV",
            "airport": "Vanua Balavu Airport"
          },
          {
            "label": "Vardoe, Norway (VAW)",
            "city": "Vardoe",
            "country": "Norway",
            "iata": "VAW",
            "airport": ""
          },
          {
            "label": "Varna, Bulgaria (VAR)",
            "city": "Varna",
            "country": "Bulgaria",
            "iata": "VAR",
            "airport": "Varna Airport"
          },
          {
            "label": "Vava'u, Tonga (VAV)",
            "city": "Vava'u",
            "country": "Tonga",
            "iata": "VAV",
            "airport": "Vava'u International Airport"
          },
          {
            "label": "Vaxjo, Sweden (VXO)",
            "city": "Vaxjo",
            "country": "Sweden",
            "iata": "VXO",
            "airport": ""
          },
          {
            "label": "Veracruz, Mexico (VER)",
            "city": "Veracruz",
            "country": "Mexico",
            "iata": "VER",
            "airport": "General Heriberto Jara International Airport"
          },
          {
            "label": "Verona, Italy (VRN)",
            "city": "Verona",
            "country": "Italy",
            "iata": "VRN",
            "airport": "Verona / Villafranca Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Vestmannaeyjar, Iceland (VEY)",
            "city": "Vestmannaeyjar",
            "country": "Iceland",
            "iata": "VEY",
            "airport": "Vestmannaeyjar Airport",
            "currency_code": "ISK"
          },
          {
            "label": "Victoria Falls, Zimbabwe (VFA)",
            "city": "Victoria Falls",
            "country": "Zimbabwe",
            "iata": "VFA",
            "airport": "Victoria Falls International Airport"
          },
          {
            "label": "Victoria, Canada (YWH)",
            "city": "Victoria",
            "country": "Canada",
            "iata": "YWH",
            "airport": "Victoria Harbour Seaplane Base",
            "currency_code": "CAD"
          },
          {
            "label": "Victoria, Canada (YYJ)",
            "city": "Victoria",
            "country": "Canada",
            "iata": "YYJ",
            "airport": "Victoria International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Victoria, US (VCT)",
            "city": "Victoria",
            "country": "US",
            "iata": "VCT",
            "airport": "Victoria Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Viedma, Argentina (VDM)",
            "city": "Viedma",
            "country": "Argentina",
            "iata": "VDM",
            "airport": "Gobernador Castello Airport",
            "currency_code": "ARS"
          },
          {
            "label": "Vientiane, Laos (VTE)",
            "city": "Vientiane",
            "country": "Laos",
            "iata": "VTE",
            "airport": "Wattay International Airport"
          },
          {
            "label": "Vigo, Spain (VGO)",
            "city": "Vigo",
            "country": "Spain",
            "iata": "VGO",
            "airport": "Vigo Airport"
          },
          {
            "label": "Vilanculos, Mozambique (VNX)",
            "city": "Vilanculos",
            "country": "Mozambique",
            "iata": "VNX",
            "airport": "Vilankulo Airport"
          },
          {
            "label": "Vilhelmina, Sweden (VHM)",
            "city": "Vilhelmina",
            "country": "Sweden",
            "iata": "VHM",
            "airport": "Vilhelmina Airport"
          },
          {
            "label": "Vilhena, Brazil (BVH)",
            "city": "Vilhena",
            "country": "Brazil",
            "iata": "BVH",
            "airport": "Vilhena Airport"
          },
          {
            "label": "Villahermosa, Mexico (VSA)",
            "city": "Villahermosa",
            "country": "Mexico",
            "iata": "VSA",
            "airport": ""
          },
          {
            "label": "Villavicencio, Colombia (VVC)",
            "city": "Villavicencio",
            "country": "Colombia",
            "iata": "VVC",
            "airport": "Vanguardia Airport",
            "currency_code": "COP"
          },
          {
            "label": "Vilnius, Lithuania (VNO)",
            "city": "Vilnius",
            "country": "Lithuania",
            "iata": "VNO",
            "airport": "Vilnius International Airport"
          },
          {
            "label": "Vinh City, Vietnam (VII)",
            "city": "Vinh City",
            "country": "Vietnam",
            "iata": "VII",
            "airport": "Vinh Airport"
          },
          {
            "label": "Virac, Philippines (VRC)",
            "city": "Virac",
            "country": "Philippines",
            "iata": "VRC",
            "airport": "Virac Airport"
          },
          {
            "label": "Visby, Sweden (VBY)",
            "city": "Visby",
            "country": "Sweden",
            "iata": "VBY",
            "airport": "Visby Airport"
          },
          {
            "label": "Vitoria Da Conquista, Brazil (VDC)",
            "city": "Vitoria Da Conquista",
            "country": "Brazil",
            "iata": "VDC",
            "airport": ""
          },
          {
            "label": "VitÃƒÂ³ria, Brazil (VIX)",
            "city": "VitÃƒÂ³ria",
            "country": "Brazil",
            "iata": "VIX",
            "airport": "Eurico de Aguiar Salles Airport"
          },
          {
            "label": "Vitoria, Spain (VIT)",
            "city": "Vitoria",
            "country": "Spain",
            "iata": "VIT",
            "airport": "Vitoria/Foronda Airport"
          },
          {
            "label": "Vladikavkaz, Russia (OGZ)",
            "city": "Vladikavkaz",
            "country": "Russia",
            "iata": "OGZ",
            "airport": "Beslan Airport"
          },
          {
            "label": "Vladivostok, Russia (VVO)",
            "city": "Vladivostok",
            "country": "Russia",
            "iata": "VVO",
            "airport": "Vladivostok International Airport"
          },
          {
            "label": "Volgograd, Russia (VOG)",
            "city": "Volgograd",
            "country": "Russia",
            "iata": "VOG",
            "airport": "Volgograd International Airport"
          },
          {
            "label": "Volos, Greece (VOL)",
            "city": "Volos",
            "country": "Greece",
            "iata": "VOL",
            "airport": "Nea Anchialos Airport"
          },
          {
            "label": "Vopnafjordur, Iceland (VPN)",
            "city": "Vopnafjordur",
            "country": "Iceland",
            "iata": "VPN",
            "airport": "",
            "currency_code": "ISK"
          },
          {
            "label": "Vorkuta, Russia (VKT)",
            "city": "Vorkuta",
            "country": "Russia",
            "iata": "VKT",
            "airport": "Vorkuta Airport"
          },
          {
            "label": "Voronezh, Russia (VOZ)",
            "city": "Voronezh",
            "country": "Russia",
            "iata": "VOZ",
            "airport": "Voronezh International Airport"
          },
          {
            "label": "Wabush, Canada (YWK)",
            "city": "Wabush",
            "country": "Canada",
            "iata": "YWK",
            "airport": "Wabush Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Waco, US (ACT)",
            "city": "Waco",
            "country": "US",
            "iata": "ACT",
            "airport": "Waco Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Wagga Wagga, Australia (WGA)",
            "city": "Wagga Wagga",
            "country": "Australia",
            "iata": "WGA",
            "airport": "Wagga Wagga City Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Waingapu, Indonesia (WGP)",
            "city": "Waingapu",
            "country": "Indonesia",
            "iata": "WGP",
            "airport": "Waingapu Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Wainwright, US (AIN)",
            "city": "Wainwright",
            "country": "US",
            "iata": "AIN",
            "airport": "Wainwright Airport",
            "currency_code": "USD"
          },
          {
            "label": "Wajima, Japan (NTQ)",
            "city": "Wajima",
            "country": "Japan",
            "iata": "NTQ",
            "airport": "Noto Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Wakkanai, Japan (WKJ)",
            "city": "Wakkanai",
            "country": "Japan",
            "iata": "WKJ",
            "airport": "Wakkanai Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Walaha, Vanuatu (WLH)",
            "city": "Walaha",
            "country": "Vanuatu",
            "iata": "WLH",
            "airport": "Walaha Airport"
          },
          {
            "label": "Walla Walla, US (ALW)",
            "city": "Walla Walla",
            "country": "US",
            "iata": "ALW",
            "airport": "Walla Walla Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Wallis Island, Wallis and Futuna (WLS)",
            "city": "Wallis Island",
            "country": "Wallis and Futuna",
            "iata": "WLS",
            "airport": "Hihifo Airport"
          },
          {
            "label": "Walvis Bay, Namibia (WVB)",
            "city": "Walvis Bay",
            "country": "Namibia",
            "iata": "WVB",
            "airport": "Walvis Bay Airport"
          },
          {
            "label": "Wanaka, New Zealand (WKA)",
            "city": "Wanaka",
            "country": "New Zealand",
            "iata": "WKA",
            "airport": "Wanaka Airport"
          },
          {
            "label": "Wanganui, New Zealand (WAG)",
            "city": "Wanganui",
            "country": "New Zealand",
            "iata": "WAG",
            "airport": "Wanganui Airport"
          },
          {
            "label": "Wanxian, China (WXN)",
            "city": "Wanxian",
            "country": "China",
            "iata": "WXN",
            "airport": "Wanxian Airport"
          },
          {
            "label": "Wapenamanda, Papua New Guinea (WBM)",
            "city": "Wapenamanda",
            "country": "Papua New Guinea",
            "iata": "WBM",
            "airport": "Wapenamanda Airport"
          },
          {
            "label": "Waskaganish, Canada (YKQ)",
            "city": "Waskaganish",
            "country": "Canada",
            "iata": "YKQ",
            "airport": "Waskaganish Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Waterford, Ireland (WAT)",
            "city": "Waterford",
            "country": "Ireland",
            "iata": "WAT",
            "airport": "Waterford Airport",
            "currency_code": "EUR"
          },
          {
            "label": "Waterloo, US (ALO)",
            "city": "Waterloo",
            "country": "US",
            "iata": "ALO",
            "airport": "Waterloo Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Watertown, US (ART)",
            "city": "Watertown",
            "country": "US",
            "iata": "ART",
            "airport": "Watertown International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Watertown, US (ATY)",
            "city": "Watertown",
            "country": "US",
            "iata": "ATY",
            "airport": "Watertown Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Webequie, Canada (YWP)",
            "city": "Webequie",
            "country": "Canada",
            "iata": "YWP",
            "airport": "Webequie Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Wedjh, Saudi Arabia (EJH)",
            "city": "Wedjh",
            "country": "Saudi Arabia",
            "iata": "EJH",
            "airport": "Al Wajh Domestic Airport"
          },
          {
            "label": "Weifang, China (WEF)",
            "city": "Weifang",
            "country": "China",
            "iata": "WEF",
            "airport": "Weifang Airport"
          },
          {
            "label": "Weihai, China (WEH)",
            "city": "Weihai",
            "country": "China",
            "iata": "WEH",
            "airport": "Weihai Airport"
          },
          {
            "label": "Weipa, Australia (WEI)",
            "city": "Weipa",
            "country": "Australia",
            "iata": "WEI",
            "airport": "Weipa Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Wemindji, Canada (YNC)",
            "city": "Wemindji",
            "country": "Canada",
            "iata": "YNC",
            "airport": "Wemindji Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Wenzhou, China (WNZ)",
            "city": "Wenzhou",
            "country": "China",
            "iata": "WNZ",
            "airport": "Wenzhou Yongqiang Airport"
          },
          {
            "label": "West Palm Beach, US (PBI)",
            "city": "West Palm Beach",
            "country": "US",
            "iata": "PBI",
            "airport": "Palm Beach International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Westchester County, US (HPN)",
            "city": "Westchester County",
            "country": "US",
            "iata": "HPN",
            "airport": "Westchester County Airport",
            "currency_code": "USD"
          },
          {
            "label": "Westerland, Germany (GWT)",
            "city": "Westerland",
            "country": "Germany",
            "iata": "GWT",
            "airport": "Westerland Sylt Airport"
          },
          {
            "label": "Westport, New Zealand (WSZ)",
            "city": "Westport",
            "country": "New Zealand",
            "iata": "WSZ",
            "airport": "Westport Airport"
          },
          {
            "label": "Wewak, Papua New Guinea (WWK)",
            "city": "Wewak",
            "country": "Papua New Guinea",
            "iata": "WWK",
            "airport": "Wewak International Airport"
          },
          {
            "label": "Wha Ti, Canada (YLE)",
            "city": "Wha Ti",
            "country": "Canada",
            "iata": "YLE",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Whakatane, New Zealand (WHK)",
            "city": "Whakatane",
            "country": "New Zealand",
            "iata": "WHK",
            "airport": "Whakatane Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Whale Cove, Canada (YXN)",
            "city": "Whale Cove",
            "country": "Canada",
            "iata": "YXN",
            "airport": "Whale Cove Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Whangarei, New Zealand (WRE)",
            "city": "Whangarei",
            "country": "New Zealand",
            "iata": "WRE",
            "airport": "Whangarei Airport"
          },
          {
            "label": "Whitehorse, Canada (YXY)",
            "city": "Whitehorse",
            "country": "Canada",
            "iata": "YXY",
            "airport": "Whitehorse / Erik Nielsen International Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Whyalla, Australia (WYA)",
            "city": "Whyalla",
            "country": "Australia",
            "iata": "WYA",
            "airport": "Whyalla Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Wichita Falls, US - All Airports (SPS)",
            "city": "Wichita Falls",
            "country": "US",
            "iata": "SPS",
            "airport": "Sheppard Air Force Base-Wichita Falls Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Wichita, US (ICT)",
            "city": "Wichita",
            "country": "US",
            "iata": "ICT",
            "airport": "Wichita Mid Continent Airport",
            "currency_code": "USD"
          },
          {
            "label": "Williams Harbour, Canada (YWM)",
            "city": "Williams Harbour",
            "country": "Canada",
            "iata": "YWM",
            "airport": "Williams Harbour Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Williams Lake, Canada (YWL)",
            "city": "Williams Lake",
            "country": "Canada",
            "iata": "YWL",
            "airport": "Williams Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Williamsport, US (IPT)",
            "city": "Williamsport",
            "country": "US",
            "iata": "IPT",
            "airport": "Williamsport Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Wilmington, US (ILM)",
            "city": "Wilmington",
            "country": "US",
            "iata": "ILM",
            "airport": "Wilmington International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Wiluna, Australia (WUN)",
            "city": "Wiluna",
            "country": "Australia",
            "iata": "WUN",
            "airport": "Wiluna Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Windhoek, Namibia (ERS)",
            "city": "Windhoek",
            "country": "Namibia",
            "iata": "ERS",
            "airport": "Eros Airport"
          },
          {
            "label": "Windhoek, Namibia (WDH)",
            "city": "Windhoek",
            "country": "Namibia",
            "iata": "WDH",
            "airport": "Hosea Kutako International Airport"
          },
          {
            "label": "Windorah, Australia (WNR)",
            "city": "Windorah",
            "country": "Australia",
            "iata": "WNR",
            "airport": "Windorah Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Windsor Locks, US (BDL)",
            "city": "Windsor Locks",
            "country": "US",
            "iata": "BDL",
            "airport": "Bradley International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Windsor, Canada (YQG)",
            "city": "Windsor",
            "country": "Canada",
            "iata": "YQG",
            "airport": "Windsor Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Winton, Australia (WIN)",
            "city": "Winton",
            "country": "Australia",
            "iata": "WIN",
            "airport": "Winton Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Wipim, Papua New Guinea (WPM)",
            "city": "Wipim",
            "country": "Papua New Guinea",
            "iata": "WPM",
            "airport": "Wipim Airport"
          },
          {
            "label": "Woja, Marshall Islands (WJA)",
            "city": "Woja",
            "country": "Marshall Islands",
            "iata": "WJA",
            "airport": "Woja Airport"
          },
          {
            "label": "Wollongong, Australia (WOL)",
            "city": "Wollongong",
            "country": "Australia",
            "iata": "WOL",
            "airport": "Wollongong Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Wonju, South Korea (WJU)",
            "city": "Wonju",
            "country": "South Korea",
            "iata": "WJU",
            "airport": "Wonju Airport"
          },
          {
            "label": "Worland, US (WRL)",
            "city": "Worland",
            "country": "US",
            "iata": "WRL",
            "airport": "Worland Municipal Airport",
            "currency_code": "USD"
          },
          {
            "label": "Wrangell, US (WRG)",
            "city": "Wrangell",
            "country": "US",
            "iata": "WRG",
            "airport": "Wrangell Airport",
            "currency_code": "USD"
          },
          {
            "label": "Wroclaw, Poland (WRO)",
            "city": "Wroclaw",
            "country": "Poland",
            "iata": "WRO",
            "airport": "Copernicus Wroclaw Airport"
          },
          {
            "label": "Wuhan, China (WUH)",
            "city": "Wuhan",
            "country": "China",
            "iata": "WUH",
            "airport": "Wuhan Tianhe International Airport"
          },
          {
            "label": "Wunnummin Lake, Canada (WNN)",
            "city": "Wunnummin Lake",
            "country": "Canada",
            "iata": "WNN",
            "airport": "Wunnumin Lake Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Wuxi, China (WUX)",
            "city": "Wuxi",
            "country": "China",
            "iata": "WUX",
            "airport": "Sunan Shuofang International Airport"
          },
          {
            "label": "Wuyishan, China (WUS)",
            "city": "Wuyishan",
            "country": "China",
            "iata": "WUS",
            "airport": "Nanping Wuyishan Airport"
          },
          {
            "label": "Wuzhou, China (WUZ)",
            "city": "Wuzhou",
            "country": "China",
            "iata": "WUZ",
            "airport": "Changzhoudao Airport"
          },
          {
            "label": "Xiamen, China (XMN)",
            "city": "Xiamen",
            "country": "China",
            "iata": "XMN",
            "airport": "Xiamen Gaoqi International Airport"
          },
          {
            "label": "Xian, China (SIA)",
            "city": "Xian",
            "country": "China",
            "iata": "SIA",
            "airport": "Xiguan Airport"
          },
          {
            "label": "Xian, China (XIY)",
            "city": "Xian",
            "country": "China",
            "iata": "XIY",
            "airport": "Xi'an Xianyang International Airport"
          },
          {
            "label": "Xiangfan, China (XFN)",
            "city": "Xiangfan",
            "country": "China",
            "iata": "XFN",
            "airport": "Xiangfan Airport"
          },
          {
            "label": "Xichang, China (XIC)",
            "city": "Xichang",
            "country": "China",
            "iata": "XIC",
            "airport": "Xichang Qingshan Airport"
          },
          {
            "label": "Xieng Khouang, Laos (XKH)",
            "city": "Xieng Khouang",
            "country": "Laos",
            "iata": "XKH",
            "airport": "Xieng Khouang Airport"
          },
          {
            "label": "Xilin Hot, China (XIL)",
            "city": "Xilin Hot",
            "country": "China",
            "iata": "XIL",
            "airport": "Xilinhot Airport"
          },
          {
            "label": "Xingyi, China (ACX)",
            "city": "Xingyi",
            "country": "China",
            "iata": "ACX",
            "airport": "Xingyi Airport"
          },
          {
            "label": "Xining, China (XNN)",
            "city": "Xining",
            "country": "China",
            "iata": "XNN",
            "airport": "Xining Caojiabu Airport"
          },
          {
            "label": "Xuzhou, China (XUZ)",
            "city": "Xuzhou",
            "country": "China",
            "iata": "XUZ",
            "airport": "Xuzhou Guanyin Airport"
          },
          {
            "label": "Yakima, US (YKM)",
            "city": "Yakima",
            "country": "US",
            "iata": "YKM",
            "airport": "Yakima Air Terminal McAllister Field",
            "currency_code": "USD"
          },
          {
            "label": "Yakutsk, Russia (YKS)",
            "city": "Yakutsk",
            "country": "Russia",
            "iata": "YKS",
            "airport": "Yakutsk Airport"
          },
          {
            "label": "Yam Island, Australia (XMY)",
            "city": "Yam Island",
            "country": "Australia",
            "iata": "XMY",
            "airport": "Yam Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Yamagata, Japan (GAJ)",
            "city": "Yamagata",
            "country": "Japan",
            "iata": "GAJ",
            "airport": "Yamagata Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Yan'an, China (ENY)",
            "city": "Yan'an",
            "country": "China",
            "iata": "ENY",
            "airport": "Yan'an Airport"
          },
          {
            "label": "Yanbu, Saudi Arabia (YNB)",
            "city": "Yanbu",
            "country": "Saudi Arabia",
            "iata": "YNB",
            "airport": "Yenbo Airport"
          },
          {
            "label": "Yancheng, China (YNZ)",
            "city": "Yancheng",
            "country": "China",
            "iata": "YNZ",
            "airport": "Yancheng Airport"
          },
          {
            "label": "Yangyang, South Korea (YNY)",
            "city": "Yangyang",
            "country": "South Korea",
            "iata": "YNY",
            "airport": "Yangyang International Airport"
          },
          {
            "label": "Yanji, China (YNJ)",
            "city": "Yanji",
            "country": "China",
            "iata": "YNJ",
            "airport": "Yanji Chaoyangchuan Airport"
          },
          {
            "label": "Yantai, China (YNT)",
            "city": "Yantai",
            "country": "China",
            "iata": "YNT",
            "airport": "Yantai Laishan Airport"
          },
          {
            "label": "Yellowknife, Canada (YZF)",
            "city": "Yellowknife",
            "country": "Canada",
            "iata": "YZF",
            "airport": "Yellowknife Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Yeosu, South Korea (RSU)",
            "city": "Yeosu",
            "country": "South Korea",
            "iata": "RSU",
            "airport": "Yeosu Airport"
          },
          {
            "label": "Yerevan, Armenia (EVN)",
            "city": "Yerevan",
            "country": "Armenia",
            "iata": "EVN",
            "airport": "Zvartnots International Airport",
            "currency_code": "AMD"
          },
          {
            "label": "Yibin, China (YBP)",
            "city": "Yibin",
            "country": "China",
            "iata": "YBP",
            "airport": "Yibin Caiba Airport"
          },
          {
            "label": "Yichang, China (YIH)",
            "city": "Yichang",
            "country": "China",
            "iata": "YIH",
            "airport": "Yichang Airport"
          },
          {
            "label": "Yinchuan, China (INC)",
            "city": "Yinchuan",
            "country": "China",
            "iata": "INC",
            "airport": "Yinchuan Airport"
          },
          {
            "label": "Yining, China (YIN)",
            "city": "Yining",
            "country": "China",
            "iata": "YIN",
            "airport": "Yining Airport"
          },
          {
            "label": "Yiwu, China (YIW)",
            "city": "Yiwu",
            "country": "China",
            "iata": "YIW",
            "airport": "Yiwu Airport"
          },
          {
            "label": "Yogyakarta, Indonesia (JOG)",
            "city": "Yogyakarta",
            "country": "Indonesia",
            "iata": "JOG",
            "airport": "Adi Sutjipto International Airport",
            "currency_code": "IDR"
          },
          {
            "label": "Yonago, Japan (YGJ)",
            "city": "Yonago",
            "country": "Japan",
            "iata": "YGJ",
            "airport": "Miho Yonago Airport",
            "currency_code": "JPY"
          },
          {
            "label": "Yonaguni Jima, Japan (OGN)",
            "city": "Yonaguni Jima",
            "country": "Japan",
            "iata": "OGN",
            "airport": "Yonaguni Airport",
            "currency_code": "JPY"
          },
          {
            "label": "York Landing, Canada (ZAC)",
            "city": "York Landing",
            "country": "Canada",
            "iata": "ZAC",
            "airport": "York Landing Airport",
            "currency_code": "CAD"
          },
          {
            "label": "Yorke Island, Australia (OKR)",
            "city": "Yorke Island",
            "country": "Australia",
            "iata": "OKR",
            "airport": "Yorke Island Airport",
            "currency_code": "AUD"
          },
          {
            "label": "Youngstown, US (YNG)",
            "city": "Youngstown",
            "country": "US",
            "iata": "YNG",
            "airport": "Youngstown Warren Regional Airport",
            "currency_code": "USD"
          },
          {
            "label": "Yulin, China (UYN)",
            "city": "Yulin",
            "country": "China",
            "iata": "UYN",
            "airport": "Yulin Airport"
          },
          {
            "label": "Yuma, US (YUM)",
            "city": "Yuma",
            "country": "US",
            "iata": "YUM",
            "airport": "Yuma MCAS/Yuma International Airport",
            "currency_code": "USD"
          },
          {
            "label": "Yuzhno-Sakhalinsk, Russia (UUS)",
            "city": "Yuzhno-Sakhalinsk",
            "country": "Russia",
            "iata": "UUS",
            "airport": "Yuzhno-Sakhalinsk Airport"
          },
          {
            "label": "Zacatecas, Mexico (ZCL)",
            "city": "Zacatecas",
            "country": "Mexico",
            "iata": "ZCL",
            "airport": "General Leobardo C. Ruiz International Airport"
          },
          {
            "label": "Zadar, Croatia (ZAD)",
            "city": "Zadar",
            "country": "Croatia",
            "iata": "ZAD",
            "airport": "Zemunik Airport"
          },
          {
            "label": "Zagreb, Croatia (ZAG)",
            "city": "Zagreb",
            "country": "Croatia",
            "iata": "ZAG",
            "airport": "Zagreb Airport"
          },
          {
            "label": "Zakinthos, Greece (ZTH)",
            "city": "Zakinthos",
            "country": "Greece",
            "iata": "ZTH",
            "airport": "Dionysios Solomos Airport"
          },
          {
            "label": "Zamboanga, Philippines (ZAM)",
            "city": "Zamboanga",
            "country": "Philippines",
            "iata": "ZAM",
            "airport": "Zamboanga International Airport"
          },
          {
            "label": "Zanzibar, Tanzania (ZNZ)",
            "city": "Zanzibar",
            "country": "Tanzania",
            "iata": "ZNZ",
            "airport": "Zanzibar Airport"
          },
          {
            "label": "Zaporozhye, Ukraine (OZH)",
            "city": "Zaporozhye",
            "country": "Ukraine",
            "iata": "OZH",
            "airport": "Zaporizhzhia International Airport"
          },
          {
            "label": "Zaragoza, Spain (ZAZ)",
            "city": "Zaragoza",
            "country": "Spain",
            "iata": "ZAZ",
            "airport": "Zaragoza Air Base"
          },
          {
            "label": "Zhambyl, Kazakhstan (DMB)",
            "city": "Zhambyl",
            "country": "Kazakhstan",
            "iata": "DMB",
            "airport": "Taraz Airport"
          },
          {
            "label": "Zhanjiang, China (ZHA)",
            "city": "Zhanjiang",
            "country": "China",
            "iata": "ZHA",
            "airport": "Zhanjiang Airport"
          },
          {
            "label": "Zhaotong, China (ZAT)",
            "city": "Zhaotong",
            "country": "China",
            "iata": "ZAT",
            "airport": "Zhaotong Airport"
          },
          {
            "label": "Zhengzhou, China (CGO)",
            "city": "Zhengzhou",
            "country": "China",
            "iata": "CGO",
            "airport": "Xinzheng Airport"
          },
          {
            "label": "Zhezkazgan, Kazakhstan (DZN)",
            "city": "Zhezkazgan",
            "country": "Kazakhstan",
            "iata": "DZN",
            "airport": "Dzhezkazgan Airport"
          },
          {
            "label": "Zhoushan, China (HSN)",
            "city": "Zhoushan",
            "country": "China",
            "iata": "HSN",
            "airport": "Zhoushan Airport"
          },
          {
            "label": "Zhuhai, China (ZUH)",
            "city": "Zhuhai",
            "country": "China",
            "iata": "ZUH",
            "airport": "Zhuhai Airport"
          },
          {
            "label": "Zielona Gora, Poland (IEG)",
            "city": "Zielona Gora",
            "country": "Poland",
            "iata": "IEG",
            "airport": ""
          },
          {
            "label": "Ziguinchor, Senegal (ZIG)",
            "city": "Ziguinchor",
            "country": "Senegal",
            "iata": "ZIG",
            "airport": "Ziguinchor Airport"
          },
          {
            "label": "Zilina, Slovakia (ILZ)",
            "city": "Zilina",
            "country": "Slovakia",
            "iata": "ILZ",
            "airport": ""
          },
          {
            "label": "Zouerate, Mauritania (OUZ)",
            "city": "Zouerate",
            "country": "Mauritania",
            "iata": "OUZ",
            "airport": "Tazadit Airport"
          },
          {
            "label": "Abadan, Iran (ABD)",
            "city": "Abadon",
            "country": "Iran",
            "iata": "ABD",
            "airport": "Abadan Airport",
            "currency_code": "IRR"
          },
          {
            "label": "Mehrabad, Iran (THR)",
            "city": "Theran",
            "country": "Iran",
            "iata": "THR",
            "airport": "Mehrabad International Airport",
            "currency_code": "IRR"
          },
          {
            "label": "Ahwaz, Iran (AWZ)",
            "city": "Ahwaz",
            "country": "Iran",
            "iata": "AWZ",
            "airport": "Ahwaz Airport",
            "currency_code": "IRR"
          },
          {
            "label": "Ardabil, Iran (ADU)",
            "city": "Ardabil",
            "country": "Iran",
            "iata": "ADU",
            "airport": "Ardabil Airport",
            "currency_code": "IRR"
          },
          {
            "label": "Bam, Iran (BXR)",
            "city": "Bam",
            "country": "Iran",
            "iata": "BXR",
            "airport": "Bam Airport",
            "currency_code": "IRR"
          },
          {
            "label": "Bandar Abbas, Iran (BND)",
            "city": "Bandar Abbas",
            "country": "Iran",
            "iata": "BND",
            "airport": "Bandar Abbas International Airport",
            "currency_code": "IRR"
          },
          {
            "label": "Bandar Lengeh, Iran (BDH)",
            "city": "Bandar Lengeh",
            "country": "Iran",
            "iata": "BDH",
            "airport": "Bandar Lengeh Airport",
            "currency_code": "IRR"
          },
          {
            "label": "Birjand, Iran (XBJ)",
            "city": "Birjand",
            "country": "Iran",
            "iata": "XBJ",
            "airport": "Birjand Airport",
            "currency_code": "IRR"
          },
          {
            "label": "Bojnourd, Iran (BJB)",
            "city": "Bojnourd",
            "country": "Iran",
            "iata": "BJB",
            "airport": "Bojnord Airport",
            "currency_code": "IRR"
          },
          {
            "label": "Bushehr, Iran (BUZ)",
            "city": "Bushehr",
            "country": "Iran",
            "iata": "BUZ",
            "airport": "Bushehr Airport",
            "currency_code": "IRR"
          },
          {
            "label": "Chah Bahar, Iran (ZBR)",
            "city": "Chah Bahar",
            "country": "Iran",
            "iata": "ZBR",
            "airport": "Konarak Airport",
            "currency_code": "IRR"
          },
          {
            "label": "New York, US - All Airports (NYC)",
            "city": "New York",
            "country": "US",
            "iata": "NYC",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "London, UK - All Airports (LON)",
            "city": "London",
            "country": "UK",
            "iata": "LON",
            "airport": "",
            "currency_code": "GBP"
          },
          {
            "label": "Toronto, Canada - All Airports (YTO)",
            "city": "Toronto",
            "country": "Canada",
            "iata": "YTO",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Chicago, US - All Airports (CHI)",
            "city": "Chicago",
            "country": "US",
            "iata": "CHI",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Paris, France - All Airports (PAR)",
            "city": "Paris",
            "country": "France",
            "iata": "PAR",
            "airport": ""
          },
          {
            "label": "Washington, US - All Airports (WAS)",
            "city": "Washington",
            "country": "US",
            "iata": "WAS",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Beijing, China - All Airports (BJS)",
            "city": "Beijing",
            "country": "China",
            "iata": "BJS",
            "airport": ""
          },
          {
            "label": "Jakarta, Indonesia - All Airports (JKT)",
            "city": "Jakarta",
            "country": "Indonesia",
            "iata": "JKT",
            "airport": "",
            "currency_code": "IDR"
          },
          {
            "label": "Tuticorin, India (TCR)",
            "city": "Tuticorin",
            "country": "India",
            "iata": "TCR",
            "airport": "",
            "currency_code": "INR"
          },
          {
            "label": "Moscow, Russia - All Airports (MOW)",
            "city": "Moscow",
            "country": "Russia",
            "iata": "MOW",
            "airport": ""
          },
          {
            "label": "Milan, Italy - All Airports (MIL)",
            "city": "Milan",
            "country": "Italy",
            "iata": "MIL",
            "airport": "",
            "currency_code": "EUR"
          },
          {
            "label": "Seoul, South Korea - All Airports (SEL)",
            "city": "Seoul",
            "country": "South Korea",
            "iata": "SEL",
            "airport": ""
          },
          {
            "label": "Rome, Italy - All Airports (ROM)",
            "city": "Rome",
            "country": "Italy",
            "iata": "ROM",
            "airport": "",
            "currency_code": "EUR"
          },
          {
            "label": "Tokyo, Japan - All Airports (TYO)",
            "city": "Tokyo",
            "country": "Japan",
            "iata": "TYO",
            "airport": "",
            "currency_code": "JPY"
          },
          {
            "label": "Seattle, US (LKE)",
            "city": "Seattle",
            "country": "US",
            "iata": "LKE",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Detroit, US - All Airports (DTT)",
            "city": "Detroit",
            "country": "US",
            "iata": "DTT",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Berlin, Germany - All Airports (BER)",
            "city": "Berlin",
            "country": "Germany",
            "iata": "BER",
            "airport": ""
          },
          {
            "label": "Stockholm, Sweden - All Airports (STO)",
            "city": "Stockholm",
            "country": "Sweden",
            "iata": "STO",
            "airport": ""
          },
          {
            "label": "Orlando, US - All Airports (ORL)",
            "city": "Orlando",
            "country": "US",
            "iata": "ORL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Montreal, Canada - All Airports (YMQ)",
            "city": "Montreal",
            "country": "Canada",
            "iata": "YMQ",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Rio de Janeiro, Brazil - All Airports (RIO)",
            "city": "Rio de Janeiro",
            "country": "Brazil",
            "iata": "RIO",
            "airport": ""
          },
          {
            "label": "Edmonton, Canada - All Airports (YEA)",
            "city": "Edmonton",
            "country": "Canada",
            "iata": "YEA",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Osaka, Japan - All Airports (OSA)",
            "city": "Osaka",
            "country": "Japan",
            "iata": "OSA",
            "airport": "",
            "currency_code": "JPY"
          },
          {
            "label": "Macau, Macao (XZM)",
            "city": "Macau",
            "country": "Macao",
            "iata": "XZM",
            "airport": ""
          },
          {
            "label": "Bucharest, Romania - All Airports (BUH)",
            "city": "Bucharest",
            "country": "Romania",
            "iata": "BUH",
            "airport": "",
            "currency_code": "RON"
          },
          {
            "label": "Buenos Aires, Argentina - All Airports (BUE)",
            "city": "Buenos Aires",
            "country": "Argentina",
            "iata": "BUE",
            "airport": "",
            "currency_code": "ARS"
          },
          {
            "label": "Al Najaf, Iraq (NJF)",
            "city": "Al Najaf",
            "country": "Iraq",
            "iata": "NJF",
            "airport": "",
            "currency_code": "IQD"
          },
          {
            "label": "Ujjain, India (UJA)",
            "city": "Ujjain",
            "country": "India",
            "iata": "UJA",
            "airport": "",
            "currency_code": "INR"
          },
          {
            "label": "Aitape, Papua New Guinea (TAJ)",
            "city": "Aitape",
            "country": "Papua New Guinea",
            "iata": "TAJ",
            "airport": ""
          },
          {
            "label": "Akiachak, US (KKI)",
            "city": "Akiachak",
            "country": "US",
            "iata": "KKI",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Alakanuk, US (AUK)",
            "city": "Alakanuk",
            "country": "US",
            "iata": "AUK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Altus, US - All Airports (LTS)",
            "city": "Altus",
            "country": "US",
            "iata": "LTS",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Alvesta, Sweden (XXA)",
            "city": "Alvesta",
            "country": "Sweden",
            "iata": "XXA",
            "airport": ""
          },
          {
            "label": "Arona, Solomon Islands (RNA)",
            "city": "Arona",
            "country": "Solomon Islands",
            "iata": "RNA",
            "airport": ""
          },
          {
            "label": "Aspen, US (ASE)",
            "city": "Aspen",
            "country": "US",
            "iata": "ASE",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Atmautluak, US (ATT)",
            "city": "Atmautluak",
            "country": "US",
            "iata": "ATT",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Avesta Krylbo, Sweden (XYP)",
            "city": "Avesta Krylbo",
            "country": "Sweden",
            "iata": "XYP",
            "airport": ""
          },
          {
            "label": "Avu Avu, Solomon Islands (AVU)",
            "city": "Avu Avu",
            "country": "Solomon Islands",
            "iata": "AVU",
            "airport": ""
          },
          {
            "label": "Baghdad, Iraq (BGW)",
            "city": "Baghdad",
            "country": "Iraq",
            "iata": "BGW",
            "airport": "",
            "currency_code": "IQD"
          },
          {
            "label": "Baoshan, China (BSD)",
            "city": "Baoshan",
            "country": "China",
            "iata": "BSD",
            "airport": ""
          },
          {
            "label": "Beaver, US (WBQ)",
            "city": "Beaver",
            "country": "US",
            "iata": "WBQ",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Bella Bella, Canada (ZEL)",
            "city": "Bella Bella",
            "country": "Canada",
            "iata": "ZEL",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Belleville, US (BLV)",
            "city": "Belleville",
            "country": "US",
            "iata": "BLV",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Bellona, Solomon Islands (BNY)",
            "city": "Bellona",
            "country": "Solomon Islands",
            "iata": "BNY",
            "airport": ""
          },
          {
            "label": "Belo Horizonte, Brazil - All Airports (BHZ)",
            "city": "Belo Horizonte",
            "country": "Brazil",
            "iata": "BHZ",
            "airport": ""
          },
          {
            "label": "Bemidji, US (BJI)",
            "city": "Bemidji",
            "country": "US",
            "iata": "BJI",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Bentonville, US (XNA)",
            "city": "Bentonville",
            "country": "US",
            "iata": "XNA",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Biloela, Australia (ZBL)",
            "city": "Biloela",
            "country": "Australia",
            "iata": "ZBL",
            "airport": "",
            "currency_code": "AUD"
          },
          {
            "label": "Birch Creek, US (KBC)",
            "city": "Birch Creek",
            "country": "US",
            "iata": "KBC",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Black Tickle, Canada (YBI)",
            "city": "Black Tickle",
            "country": "Canada",
            "iata": "YBI",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Block Island, US (BID)",
            "city": "Block Island",
            "country": "US",
            "iata": "BID",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Blytheville, US - All Airports (BYH)",
            "city": "Blytheville",
            "country": "US",
            "iata": "BYH",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Bradford, UK (BRF)",
            "city": "Bradford",
            "country": "UK",
            "iata": "BRF",
            "airport": "",
            "currency_code": "GBP"
          },
          {
            "label": "Brainerd, US (BRD)",
            "city": "Brainerd",
            "country": "US",
            "iata": "BRD",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Brighton, UK (BSH)",
            "city": "Brighton",
            "country": "UK",
            "iata": "BSH",
            "airport": "",
            "currency_code": "GBP"
          },
          {
            "label": "Brockville, Canada (XBR)",
            "city": "Brockville",
            "country": "Canada",
            "iata": "XBR",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Brooks Lodge, US (RBH)",
            "city": "Brooks Lodge",
            "country": "US",
            "iata": "RBH",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Burns Lake, Canada (YPZ)",
            "city": "Burns Lake",
            "country": "Canada",
            "iata": "YPZ",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Ca Mau, Vietnam (CAH)",
            "city": "Ca Mau",
            "country": "Vietnam",
            "iata": "CAH",
            "airport": ""
          },
          {
            "label": "Caldwell, US (CDW)",
            "city": "Caldwell",
            "country": "US",
            "iata": "CDW",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Carlsbad - San Diego, US (CLD)",
            "city": "Carlsbad - San Diego",
            "country": "US",
            "iata": "CLD",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Central, US (CEM)",
            "city": "Central",
            "country": "US",
            "iata": "CEM",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Chadron, US (CDR)",
            "city": "Chadron",
            "country": "US",
            "iata": "CDR",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Chalkyitsik, US (CIK)",
            "city": "Chalkyitsik",
            "country": "US",
            "iata": "CIK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Charlottetown, Canada (YHG)",
            "city": "Charlottetown",
            "country": "Canada",
            "iata": "YHG",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Chatham, Canada (XCM)",
            "city": "Chatham",
            "country": "Canada",
            "iata": "XCM",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Chefornak, US (CYF)",
            "city": "Chefornak",
            "country": "US",
            "iata": "CYF",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Chico, US (CIC)",
            "city": "Chico",
            "country": "US",
            "iata": "CIC",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Chignik, US (KCG)",
            "city": "Chignik",
            "country": "US",
            "iata": "KCG",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Chignik, US (KCQ)",
            "city": "Chignik",
            "country": "US",
            "iata": "KCQ",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Chisana, US (CZN)",
            "city": "Chisana",
            "country": "US",
            "iata": "CZN",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Choiseul Bay, Solomon Islands (CHY)",
            "city": "Choiseul Bay",
            "country": "Solomon Islands",
            "iata": "CHY",
            "airport": ""
          },
          {
            "label": "Chuathbaluk, US (CHU)",
            "city": "Chuathbaluk",
            "country": "US",
            "iata": "CHU",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Circle, US (IRC)",
            "city": "Circle",
            "country": "US",
            "iata": "IRC",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Clarks Point, US (CLP)",
            "city": "Clarks Point",
            "country": "US",
            "iata": "CLP",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Clovis, US (CVN)",
            "city": "Clovis",
            "country": "US",
            "iata": "CVN",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Cody/Yellowstone, US (COD)",
            "city": "Cody/Yellowstone",
            "country": "US",
            "iata": "COD",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Coffman Cove, US (KCC)",
            "city": "Coffman Cove",
            "country": "US",
            "iata": "KCC",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Columbus, US (GTR)",
            "city": "Columbus",
            "country": "US",
            "iata": "GTR",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Cortez, US (CEZ)",
            "city": "Cortez",
            "country": "US",
            "iata": "CEZ",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Courtenay, Canada (YCA)",
            "city": "Courtenay",
            "country": "Canada",
            "iata": "YCA",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Crooked Creek, US (CKD)",
            "city": "Crooked Creek",
            "country": "US",
            "iata": "CKD",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Devils Lake, US (DVL)",
            "city": "Devils Lake",
            "country": "US",
            "iata": "DVL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Dickinson, US (DIK)",
            "city": "Dickinson",
            "country": "US",
            "iata": "DIK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Dongying, China (DOY)",
            "city": "Dongying",
            "country": "China",
            "iata": "DOY",
            "airport": ""
          },
          {
            "label": "Duncan/Quam, Canada (DUQ)",
            "city": "Duncan/Quam",
            "country": "Canada",
            "iata": "DUQ",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Durango, US (DRO)",
            "city": "Durango",
            "country": "US",
            "iata": "DRO",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Eagle, US (EAA)",
            "city": "Eagle",
            "country": "US",
            "iata": "EAA",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Eastsound, US (ESD)",
            "city": "Eastsound",
            "country": "US",
            "iata": "ESD",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Edna Bay, US (EDA)",
            "city": "Edna Bay",
            "country": "US",
            "iata": "EDA",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Egegik, US (EGX)",
            "city": "Egegik",
            "country": "US",
            "iata": "EGX",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Eisenach, Germany (EIB)",
            "city": "Eisenach",
            "country": "Germany",
            "iata": "EIB",
            "airport": ""
          },
          {
            "label": "Ekuk, US (KKU)",
            "city": "Ekuk",
            "country": "US",
            "iata": "KKU",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "El Centro/Imperial, US (IPL)",
            "city": "El Centro/Imperial",
            "country": "US",
            "iata": "IPL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Elfin Cove, US (ELV)",
            "city": "Elfin Cove",
            "country": "US",
            "iata": "ELV",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Elim, US (ELI)",
            "city": "Elim",
            "country": "US",
            "iata": "ELI",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Ely, US (ELY)",
            "city": "Ely",
            "country": "US",
            "iata": "ELY",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Emmonak, US (EMK)",
            "city": "Emmonak",
            "country": "US",
            "iata": "EMK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Enkoping, Sweden (XWQ)",
            "city": "Enkoping",
            "country": "Sweden",
            "iata": "XWQ",
            "airport": ""
          },
          {
            "label": "Escanaba, US (ESC)",
            "city": "Escanaba",
            "country": "US",
            "iata": "ESC",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Farmington, US (FMN)",
            "city": "Farmington",
            "country": "US",
            "iata": "FMN",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Flen, Sweden (XYI)",
            "city": "Flen",
            "country": "Sweden",
            "iata": "XYI",
            "airport": ""
          },
          {
            "label": "Fort Collins/Loveland, US (FNL)",
            "city": "Fort Collins/Loveland",
            "country": "US",
            "iata": "FNL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Franklin, US (FKL)",
            "city": "Franklin",
            "country": "US",
            "iata": "FKL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Fuyang, China (FUG)",
            "city": "Fuyang",
            "country": "China",
            "iata": "FUG",
            "airport": ""
          },
          {
            "label": "Gethsemani, Canada (ZGS)",
            "city": "Gethsemani",
            "country": "Canada",
            "iata": "ZGS",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Gillette, US (GCC)",
            "city": "Gillette",
            "country": "US",
            "iata": "GCC",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Glendive, US (GDV)",
            "city": "Glendive",
            "country": "US",
            "iata": "GDV",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Golovin, US (GLV)",
            "city": "Golovin",
            "country": "US",
            "iata": "GLV",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Grayling, US (KGX)",
            "city": "Grayling",
            "country": "US",
            "iata": "KGX",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Great Bend, US (GBD)",
            "city": "Great Bend",
            "country": "US",
            "iata": "GBD",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Greenville, US (PGV)",
            "city": "Greenville",
            "country": "US",
            "iata": "PGV",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Gunnison, US (GUC)",
            "city": "Gunnison",
            "country": "US",
            "iata": "GUC",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Havasupai, US (HAE)",
            "city": "Havasupai",
            "country": "US",
            "iata": "HAE",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Havre, US (HVR)",
            "city": "Havre",
            "country": "US",
            "iata": "HVR",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Hayden, US (HDN)",
            "city": "Hayden",
            "country": "US",
            "iata": "HDN",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Hays, US (HYS)",
            "city": "Hays",
            "country": "US",
            "iata": "HYS",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Healy Lake, US (HKB)",
            "city": "Healy Lake",
            "country": "US",
            "iata": "HKB",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Hedemora, Sweden (XXU)",
            "city": "Hedemora",
            "country": "Sweden",
            "iata": "XXU",
            "airport": ""
          },
          {
            "label": "Heidelberg, Germany (HDB)",
            "city": "Heidelberg",
            "country": "Germany",
            "iata": "HDB",
            "airport": ""
          },
          {
            "label": "Herrljunga, Sweden (XYC)",
            "city": "Herrljunga",
            "country": "Sweden",
            "iata": "XYC",
            "airport": ""
          },
          {
            "label": "Hilton Head, US (HHH)",
            "city": "Hilton Head",
            "country": "US",
            "iata": "HHH",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Hobbs, US (HOB)",
            "city": "Hobbs",
            "country": "US",
            "iata": "HOB",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Hollis, US (HYL)",
            "city": "Hollis",
            "country": "US",
            "iata": "HYL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Houeisay, Laos (HOE)",
            "city": "Houeisay",
            "country": "Laos",
            "iata": "HOE",
            "airport": ""
          },
          {
            "label": "Hudson Bay, Canada (YHB)",
            "city": "Hudson Bay",
            "country": "Canada",
            "iata": "YHB",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Hughes, US (HUS)",
            "city": "Hughes",
            "country": "US",
            "iata": "HUS",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Huslia, US (HSL)",
            "city": "Huslia",
            "country": "US",
            "iata": "HSL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Ilford, Canada (ILF)",
            "city": "Ilford",
            "country": "Canada",
            "iata": "ILF",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Inyokern, US (IYK)",
            "city": "Inyokern",
            "country": "US",
            "iata": "IYK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Ipswich, UK (IPW)",
            "city": "Ipswich",
            "country": "UK",
            "iata": "IPW",
            "airport": "",
            "currency_code": "GBP"
          },
          {
            "label": "Iron Mountain, US (IMT)",
            "city": "Iron Mountain",
            "country": "US",
            "iata": "IMT",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Ironwood, US (IWD)",
            "city": "Ironwood",
            "country": "US",
            "iata": "IWD",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Izmir, Turkey - All Airports (IZM)",
            "city": "Izmir",
            "country": "Turkey",
            "iata": "IZM",
            "airport": ""
          },
          {
            "label": "Jacksonville, US - Albert Ellis Apt (OAJ)",
            "city": "Jacksonville",
            "country": "US",
            "iata": "OAJ",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Jamestown, US (JHW)",
            "city": "Jamestown",
            "country": "US",
            "iata": "JHW",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Jijiga, Ethiopia (JIJ)",
            "city": "Jijiga",
            "country": "Ethiopia",
            "iata": "JIJ",
            "airport": ""
          },
          {
            "label": "Kakhonak, US (KNK)",
            "city": "Kakhonak",
            "country": "US",
            "iata": "KNK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Kalymnos, Greece (JKL)",
            "city": "Kalymnos",
            "country": "Greece",
            "iata": "JKL",
            "airport": ""
          },
          {
            "label": "Kampala, Uganda (KLA)",
            "city": "Kampala",
            "country": "Uganda",
            "iata": "KLA",
            "airport": ""
          },
          {
            "label": "Kangiqsujuaq, Canada (YWB)",
            "city": "Kangiqsujuaq",
            "country": "Canada",
            "iata": "YWB",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Karluk, US (KYK)",
            "city": "Karluk",
            "country": "US",
            "iata": "KYK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Kasaan, US (KXA)",
            "city": "Kasaan",
            "country": "US",
            "iata": "KXA",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Kasigluk, US (KUK)",
            "city": "Kasigluk",
            "country": "US",
            "iata": "KUK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Katrineholm, Sweden (XXK)",
            "city": "Katrineholm",
            "country": "Sweden",
            "iata": "XXK",
            "airport": ""
          },
          {
            "label": "Keewaywin, Canada (KEW)",
            "city": "Keewaywin",
            "country": "Canada",
            "iata": "KEW",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Kegaska, Canada (ZKG)",
            "city": "Kegaska",
            "country": "Canada",
            "iata": "ZKG",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "King Khalid Mil. City, Saudi Arabia (KMC)",
            "city": "King Khalid Mil. City",
            "country": "Saudi Arabia",
            "iata": "KMC",
            "airport": ""
          },
          {
            "label": "Kipnuk, US (KPN)",
            "city": "Kipnuk",
            "country": "US",
            "iata": "KPN",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Kitoi Bay, US (KKB)",
            "city": "Kitoi Bay",
            "country": "US",
            "iata": "KKB",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Klawock, US (KLW)",
            "city": "Klawock",
            "country": "US",
            "iata": "KLW",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Kobuk, US (OBU)",
            "city": "Kobuk",
            "country": "US",
            "iata": "OBU",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Kongiganak, US (KKH)",
            "city": "Kongiganak",
            "country": "US",
            "iata": "KKH",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Kotlik, US (KOT)",
            "city": "Kotlik",
            "country": "US",
            "iata": "KOT",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Koyuk, US (KKA)",
            "city": "Koyuk",
            "country": "US",
            "iata": "KKA",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Koyukuk, US (KYU)",
            "city": "Koyukuk",
            "country": "US",
            "iata": "KYU",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Kwajalein Atoll, Marshall Islands (EAL)",
            "city": "Kwajalein Atoll",
            "country": "Marshall Islands",
            "iata": "EAL",
            "airport": ""
          },
          {
            "label": "Kwethluk, US (KWT)",
            "city": "Kwethluk",
            "country": "US",
            "iata": "KWT",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Kwigillingok, US (KWK)",
            "city": "Kwigillingok",
            "country": "US",
            "iata": "KWK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "La Tuque, Canada (YLQ)",
            "city": "La Tuque",
            "country": "Canada",
            "iata": "YLQ",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Lac Brochet, Canada (XLB)",
            "city": "Lac Brochet",
            "country": "Canada",
            "iata": "XLB",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Lake Minchumina, US (LMA)",
            "city": "Lake Minchumina",
            "country": "US",
            "iata": "LMA",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Lamacarena, Colombia (LMC)",
            "city": "Lamacarena",
            "country": "Colombia",
            "iata": "LMC",
            "airport": "",
            "currency_code": "COP"
          },
          {
            "label": "Langley, Canada (YLY)",
            "city": "Langley",
            "country": "Canada",
            "iata": "YLY",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Larsen Bay, US (KLN)",
            "city": "Larsen Bay",
            "country": "US",
            "iata": "KLN",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Lawton, US (LAW)",
            "city": "Lawton",
            "country": "US",
            "iata": "LAW",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Leshukonskoye, Russia (LDG)",
            "city": "Leshukonskoye",
            "country": "Russia",
            "iata": "LDG",
            "airport": ""
          },
          {
            "label": "Levelock, US (KLL)",
            "city": "Levelock",
            "country": "US",
            "iata": "KLL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Lewisburg, US (LWB)",
            "city": "Lewisburg",
            "country": "US",
            "iata": "LWB",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Lincang, China (LNJ)",
            "city": "Lincang",
            "country": "China",
            "iata": "LNJ",
            "airport": ""
          },
          {
            "label": "Malmo, Sweden - All Airports (MMA)",
            "city": "Malmo",
            "country": "Sweden",
            "iata": "MMA",
            "airport": ""
          },
          {
            "label": "Manistee, US (MBL)",
            "city": "Manistee",
            "country": "US",
            "iata": "MBL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Manley Hot Springs, US (MLY)",
            "city": "Manley Hot Springs",
            "country": "US",
            "iata": "MLY",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Manokotak, US (KMO)",
            "city": "Manokotak",
            "country": "US",
            "iata": "KMO",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Marietta, US - All Airports (MGE)",
            "city": "Marietta",
            "country": "US",
            "iata": "MGE",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Marion, US (MWA)",
            "city": "Marion",
            "country": "US",
            "iata": "MWA",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Marquette, US (MQT)",
            "city": "Marquette",
            "country": "US",
            "iata": "MQT",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Marshall, US (MLL)",
            "city": "Marshall",
            "country": "US",
            "iata": "MLL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Mason City, US (MCW)",
            "city": "Mason City",
            "country": "US",
            "iata": "MCW",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "McCall, US (MYL)",
            "city": "McCall",
            "country": "US",
            "iata": "MYL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "McCook, US (MCK)",
            "city": "McCook",
            "country": "US",
            "iata": "MCK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Metlakatla, US (MTM)",
            "city": "Metlakatla",
            "country": "US",
            "iata": "MTM",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Meyers Chuck, US (WMK)",
            "city": "Meyers Chuck",
            "country": "US",
            "iata": "WMK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Milton Keynes, UK (KYN)",
            "city": "Milton Keynes",
            "country": "UK",
            "iata": "KYN",
            "airport": "",
            "currency_code": "GBP"
          },
          {
            "label": "Minto, US (MNT)",
            "city": "Minto",
            "country": "US",
            "iata": "MNT",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Moab, US (CNY)",
            "city": "Moab",
            "country": "US",
            "iata": "CNY",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Monkey Mia, Australia (MJK)",
            "city": "Monkey Mia",
            "country": "Australia",
            "iata": "MJK",
            "airport": "",
            "currency_code": "AUD"
          },
          {
            "label": "Montrose, US (MTJ)",
            "city": "Montrose",
            "country": "US",
            "iata": "MTJ",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Moser Bay, US (KMY)",
            "city": "Moser Bay",
            "country": "US",
            "iata": "KMY",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Mulhouse/Basel, France (MLH)",
            "city": "Mulhouse/Basel",
            "country": "France",
            "iata": "MLH",
            "airport": ""
          },
          {
            "label": "Namatanai, Papua New Guinea (ATN)",
            "city": "Namatanai",
            "country": "Papua New Guinea",
            "iata": "ATN",
            "airport": ""
          },
          {
            "label": "Nanwalek, US (KEB)",
            "city": "Nanwalek",
            "country": "US",
            "iata": "KEB",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Napaskiak, US (PKA)",
            "city": "Napaskiak",
            "country": "US",
            "iata": "PKA",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Natuashish, Canada (YNP)",
            "city": "Natuashish",
            "country": "Canada",
            "iata": "YNP",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Naukiti, US (NKI)",
            "city": "Naukiti",
            "country": "US",
            "iata": "NKI",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Nelson Lagoon, US (NLG)",
            "city": "Nelson Lagoon",
            "country": "US",
            "iata": "NLG",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Neryungri, Russia (NER)",
            "city": "Neryungri",
            "country": "Russia",
            "iata": "NER",
            "airport": ""
          },
          {
            "label": "New Koliganek, US (KGK)",
            "city": "New Koliganek",
            "country": "US",
            "iata": "KGK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Nightmute, US (NME)",
            "city": "Nightmute",
            "country": "US",
            "iata": "NME",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Nikolai, US (NIB)",
            "city": "Nikolai",
            "country": "US",
            "iata": "NIB",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Nondalton, US (NNL)",
            "city": "Nondalton",
            "country": "US",
            "iata": "NNL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Noorvik, US (ORV)",
            "city": "Noorvik",
            "country": "US",
            "iata": "ORV",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Nulato, US (NUL)",
            "city": "Nulato",
            "country": "US",
            "iata": "NUL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Nunapitchuk, US (NUP)",
            "city": "Nunapitchuk",
            "country": "US",
            "iata": "NUP",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Nykoping, Sweden (XWZ)",
            "city": "Nykoping",
            "country": "Sweden",
            "iata": "XWZ",
            "airport": ""
          },
          {
            "label": "Oak Harbor, US (ODW)",
            "city": "Oak Harbor",
            "country": "US",
            "iata": "ODW",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Oakland, US - All Airports (ODM)",
            "city": "Oakland",
            "country": "US",
            "iata": "ODM",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Ogdensburg, US (OGS)",
            "city": "Ogdensburg",
            "country": "US",
            "iata": "OGS",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Old Harbor, US (OLH)",
            "city": "Old Harbor",
            "country": "US",
            "iata": "OLH",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Olga Bay, US (KOY)",
            "city": "Olga Bay",
            "country": "US",
            "iata": "KOY",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Opapamiska Lake, Canada (YBS)",
            "city": "Opapamiska Lake",
            "country": "Canada",
            "iata": "YBS",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Ouzinkie, US (KOZ)",
            "city": "Ouzinkie",
            "country": "US",
            "iata": "KOZ",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Oxnard/Ventura, US (OXR)",
            "city": "Oxnard/Ventura",
            "country": "US",
            "iata": "OXR",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Page, US (PGA)",
            "city": "Page",
            "country": "US",
            "iata": "PGA",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Pan Zhi Hua, China (PZI)",
            "city": "Pan Zhi Hua",
            "country": "China",
            "iata": "PZI",
            "airport": ""
          },
          {
            "label": "Pedro Bay, US (PDB)",
            "city": "Pedro Bay",
            "country": "US",
            "iata": "PDB",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Pelican, US (PEC)",
            "city": "Pelican",
            "country": "US",
            "iata": "PEC",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Pendleton, US (PDT)",
            "city": "Pendleton",
            "country": "US",
            "iata": "PDT",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Perryville, US (KPV)",
            "city": "Perryville",
            "country": "US",
            "iata": "KPV",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Pilot Point, US (PIP)",
            "city": "Pilot Point",
            "country": "US",
            "iata": "PIP",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Pilot Station, US (PQS)",
            "city": "Pilot Station",
            "country": "US",
            "iata": "PQS",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Point Baker, US (KPB)",
            "city": "Point Baker",
            "country": "US",
            "iata": "KPB",
            "airport": ""
          },
          {
            "label": "Poprad/Tatry, Slovakia (TAT)",
            "city": "Poprad/Tatry",
            "country": "Slovakia",
            "iata": "TAT",
            "airport": ""
          },
          {
            "label": "Port Alberni, Canada (YPB)",
            "city": "Port Alberni",
            "country": "Canada",
            "iata": "YPB",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Port Alsworth, US (PTA)",
            "city": "Port Alsworth",
            "country": "US",
            "iata": "PTA",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Port Bailey, US (KPY)",
            "city": "Port Bailey",
            "country": "US",
            "iata": "KPY",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Port Graham, US (PGM)",
            "city": "Port Graham",
            "country": "US",
            "iata": "PGM",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Port Lions, US (ORI)",
            "city": "Port Lions",
            "country": "US",
            "iata": "ORI",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Port Moller, US (PML)",
            "city": "Port Moller",
            "country": "US",
            "iata": "PML",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Port Protection, US (PPV)",
            "city": "Port Protection",
            "country": "US",
            "iata": "PPV",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Port Williams, US (KPR)",
            "city": "Port Williams",
            "country": "US",
            "iata": "KPR",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Portsmouth, UK (PME)",
            "city": "Portsmouth",
            "country": "UK",
            "iata": "PME",
            "airport": "",
            "currency_code": "GBP"
          },
          {
            "label": "Postville, Canada (YSO)",
            "city": "Postville",
            "country": "Canada",
            "iata": "YSO",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Provincetown, US (PVC)",
            "city": "Provincetown",
            "country": "US",
            "iata": "PVC",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Qualicum, Canada (XQU)",
            "city": "Qualicum",
            "country": "Canada",
            "iata": "XQU",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Quebec, Canada (XFZ)",
            "city": "Quebec",
            "country": "Canada",
            "iata": "XFZ",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Quinhagak, US (KWN)",
            "city": "Quinhagak",
            "country": "US",
            "iata": "KWN",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Rampart, US (RMP)",
            "city": "Rampart",
            "country": "US",
            "iata": "RMP",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Red Devil, US (RDV)",
            "city": "Red Devil",
            "country": "US",
            "iata": "RDV",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Red Dog, US (RDB)",
            "city": "Red Dog",
            "country": "US",
            "iata": "RDB",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "ReykjavÃƒÂ­k, Iceland (RKV)",
            "city": "ReykjavÃƒÂ­k",
            "country": "Iceland",
            "iata": "RKV",
            "airport": "",
            "currency_code": "ISK"
          },
          {
            "label": "Rio Grande, Brazil (RIG)",
            "city": "Rio Grande",
            "country": "Brazil",
            "iata": "RIG",
            "airport": ""
          },
          {
            "label": "Riverton, US (RIW)",
            "city": "Riverton",
            "country": "US",
            "iata": "RIW",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Roche Harbor, US (RCE)",
            "city": "Roche Harbor",
            "country": "US",
            "iata": "RCE",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Rockland, US (RKD)",
            "city": "Rockland",
            "country": "US",
            "iata": "RKD",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Rosario, US (RSJ)",
            "city": "Rosario",
            "country": "US",
            "iata": "RSJ",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Russian Mission, US (RSH)",
            "city": "Russian Mission",
            "country": "US",
            "iata": "RSH",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Sacramento, US (SCK)",
            "city": "Sacramento",
            "country": "US",
            "iata": "SCK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Saint George Island, US (STG)",
            "city": "Saint George Island",
            "country": "US",
            "iata": "STG",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Saint George, US (SGU)",
            "city": "Saint George",
            "country": "US",
            "iata": "SGU",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Saint Michael, US (SMK)",
            "city": "Saint Michael",
            "country": "US",
            "iata": "SMK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Sala, Sweden (XYX)",
            "city": "Sala",
            "country": "Sweden",
            "iata": "XYX",
            "airport": ""
          },
          {
            "label": "Salem, US (SLE)",
            "city": "Salem",
            "country": "US",
            "iata": "SLE",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Salmon, US (SMN)",
            "city": "Salmon",
            "country": "US",
            "iata": "SMN",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "San Luis Obispo, US - All Airports (CSL)",
            "city": "San Luis Obispo",
            "country": "US",
            "iata": "CSL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Santa Ana, Solomon Islands (NNB)",
            "city": "Santa Ana",
            "country": "Solomon Islands",
            "iata": "NNB",
            "airport": ""
          },
          {
            "label": "Santa Fe, US (SAF)",
            "city": "Santa Fe",
            "country": "US",
            "iata": "SAF",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Santa Rosa, US (STS)",
            "city": "Santa Rosa",
            "country": "US",
            "iata": "STS",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Sapporo, Japan - All Airports (SPK)",
            "city": "Sapporo",
            "country": "Japan",
            "iata": "SPK",
            "airport": "",
            "currency_code": "JPY"
          },
          {
            "label": "Saravena, Colombia (RVE)",
            "city": "Saravena",
            "country": "Colombia",
            "iata": "RVE",
            "airport": "",
            "currency_code": "COP"
          },
          {
            "label": "Sault Ste Marie, US - All Airports (SSM)",
            "city": "Sault Ste Marie",
            "country": "US",
            "iata": "SSM",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Scammon Bay, US (SCM)",
            "city": "Scammon Bay",
            "country": "US",
            "iata": "SCM",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Seal Bay, US (SYB)",
            "city": "Seal Bay",
            "country": "US",
            "iata": "SYB",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Sechelt, Canada (YHS)",
            "city": "Sechelt",
            "country": "Canada",
            "iata": "YHS",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "Selawik, US (WLK)",
            "city": "Selawik",
            "country": "US",
            "iata": "WLK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Seldovia, US (SOV)",
            "city": "Seldovia",
            "country": "US",
            "iata": "SOV",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Semipalatinsk, Kazakhstan (PLX)",
            "city": "Semipalatinsk",
            "country": "Kazakhstan",
            "iata": "PLX",
            "airport": ""
          },
          {
            "label": "Shageluk, US (SHX)",
            "city": "Shageluk",
            "country": "US",
            "iata": "SHX",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Shaktoolik, US (SKK)",
            "city": "Shaktoolik",
            "country": "US",
            "iata": "SKK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Sheffield, UK (SZD)",
            "city": "Sheffield",
            "country": "UK",
            "iata": "SZD",
            "airport": "",
            "currency_code": "GBP"
          },
          {
            "label": "Sheldon Point, US (SXP)",
            "city": "Sheldon Point",
            "country": "US",
            "iata": "SXP",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Shetland Islands, UK - All Airports (SDZ)",
            "city": "Shetland Islands",
            "country": "UK",
            "iata": "SDZ",
            "airport": "",
            "currency_code": "GBP"
          },
          {
            "label": "Show Low, US (SOW)",
            "city": "Show Low",
            "country": "US",
            "iata": "SOW",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Shungnak, US (SHG)",
            "city": "Shungnak",
            "country": "US",
            "iata": "SHG",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Sidney, US (SDY)",
            "city": "Sidney",
            "country": "US",
            "iata": "SDY",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Sleetmute, US (SLQ)",
            "city": "Sleetmute",
            "country": "US",
            "iata": "SLQ",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Snare Lake, Canada (YFJ)",
            "city": "Snare Lake",
            "country": "Canada",
            "iata": "YFJ",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "South Indian Lake, Canada (XSI)",
            "city": "South Indian Lake",
            "country": "Canada",
            "iata": "XSI",
            "airport": "",
            "currency_code": "CAD"
          },
          {
            "label": "South Naknek, US (WSN)",
            "city": "South Naknek",
            "country": "US",
            "iata": "WSN",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Stebbins, US (WBB)",
            "city": "Stebbins",
            "country": "US",
            "iata": "WBB",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Stevens Village, US (SVS)",
            "city": "Stevens Village",
            "country": "US",
            "iata": "SVS",
            "airport": ""
          },
          {
            "label": "Stony River, US (SRV)",
            "city": "Stony River",
            "country": "US",
            "iata": "SRV",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Sumter, US - All Airports (SSC)",
            "city": "Sumter",
            "country": "US",
            "iata": "SSC",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Takotna, US (TCT)",
            "city": "Takotna",
            "country": "US",
            "iata": "TCT",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Talasea, Papua New Guinea (TLW)",
            "city": "Talasea",
            "country": "Papua New Guinea",
            "iata": "TLW",
            "airport": ""
          },
          {
            "label": "Tanana, US (TAL)",
            "city": "Tanana",
            "country": "US",
            "iata": "TAL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Tawitawi, Philippines (TWT)",
            "city": "Tawitawi",
            "country": "Philippines",
            "iata": "TWT",
            "airport": ""
          },
          {
            "label": "Teller Mission, US (KTS)",
            "city": "Teller Mission",
            "country": "US",
            "iata": "KTS",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Teller, US (TLA)",
            "city": "Teller",
            "country": "US",
            "iata": "TLA",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Telluride, US (TEX)",
            "city": "Telluride",
            "country": "US",
            "iata": "TEX",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Tenakee Springs, US (TKE)",
            "city": "Tenakee Springs",
            "country": "US",
            "iata": "TKE",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Tenerife, Spain - All Airports (TCI)",
            "city": "Tenerife",
            "country": "Spain",
            "iata": "TCI",
            "airport": ""
          },
          {
            "label": "Teterboro, US (TEB)",
            "city": "Teterboro",
            "country": "US",
            "iata": "TEB",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Thief River Falls, US (TVF)",
            "city": "Thief River Falls",
            "country": "US",
            "iata": "TVF",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Thorne Bay, US (KTB)",
            "city": "Thorne Bay",
            "country": "US",
            "iata": "KTB",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Thursday Island, Australia (TIS)",
            "city": "Thursday Island",
            "country": "Australia",
            "iata": "TIS",
            "airport": "",
            "currency_code": "AUD"
          },
          {
            "label": "Tin City, US (TNC)",
            "city": "Tin City",
            "country": "US",
            "iata": "TNC",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Toksook Bay, US (OOK)",
            "city": "Toksook Bay",
            "country": "US",
            "iata": "OOK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Tongren, China (TEN)",
            "city": "Tongren",
            "country": "China",
            "iata": "TEN",
            "airport": ""
          },
          {
            "label": "Toulon, France (TLN)",
            "city": "Toulon",
            "country": "France",
            "iata": "TLN",
            "airport": ""
          },
          {
            "label": "Tuluksak, US (TLT)",
            "city": "Tuluksak",
            "country": "US",
            "iata": "TLT",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Tuntutuliak, US (WTL)",
            "city": "Tuntutuliak",
            "country": "US",
            "iata": "WTL",
            "airport": ""
          },
          {
            "label": "Tununak, US (TNK)",
            "city": "Tununak",
            "country": "US",
            "iata": "TNK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Tuxtla Gutierrez, Mexico (TGZ)",
            "city": "Tuxtla Gutierrez",
            "country": "Mexico",
            "iata": "TGZ",
            "airport": ""
          },
          {
            "label": "Twin Hills, US (TWA)",
            "city": "Twin Hills",
            "country": "US",
            "iata": "TWA",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Uganik, US (UGI)",
            "city": "Uganik",
            "country": "US",
            "iata": "UGI",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Unalakleet, US (UNK)",
            "city": "Unalakleet",
            "country": "US",
            "iata": "UNK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Venetie, US (VEE)",
            "city": "Venetie",
            "country": "US",
            "iata": "VEE",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Vernal, US (VEL)",
            "city": "Vernal",
            "country": "US",
            "iata": "VEL",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Villagarzon, Colombia (VGZ)",
            "city": "Villagarzon",
            "country": "Colombia",
            "iata": "VGZ",
            "airport": "",
            "currency_code": "COP"
          },
          {
            "label": "Visalia, US (VIS)",
            "city": "Visalia",
            "country": "US",
            "iata": "VIS",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Wadi Ad Dawasir, Saudi Arabia (WAE)",
            "city": "Wadi Ad Dawasir",
            "country": "Saudi Arabia",
            "iata": "WAE",
            "airport": ""
          },
          {
            "label": "Wales, US (WAA)",
            "city": "Wales",
            "country": "US",
            "iata": "WAA",
            "airport": ""
          },
          {
            "label": "Waterfall, US (KWF)",
            "city": "Waterfall",
            "country": "US",
            "iata": "KWF",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Wausau, US (CWA)",
            "city": "Wausau",
            "country": "US",
            "iata": "CWA",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Wenatchee, US (EAT)",
            "city": "Wenatchee",
            "country": "US",
            "iata": "EAT",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "West Point, US (KWP)",
            "city": "West Point",
            "country": "US",
            "iata": "KWP",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "West Yellowstone, US (WYS)",
            "city": "West Yellowstone",
            "country": "US",
            "iata": "WYS",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Westerly, US (WST)",
            "city": "Westerly",
            "country": "US",
            "iata": "WST",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Westsound, US (WSX)",
            "city": "Westsound",
            "country": "US",
            "iata": "WSX",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Whale Pass, US (WWP)",
            "city": "Whale Pass",
            "country": "US",
            "iata": "WWP",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "White Mountain, US (WMO)",
            "city": "White Mountain",
            "country": "US",
            "iata": "WMO",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Wiesbaden, Germany (UWE)",
            "city": "Wiesbaden",
            "country": "Germany",
            "iata": "UWE",
            "airport": ""
          },
          {
            "label": "Williston, US (ISN)",
            "city": "Williston",
            "country": "US",
            "iata": "ISN",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Wolf Point, US (OLF)",
            "city": "Wolf Point",
            "country": "US",
            "iata": "OLF",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Wu Hai, China (WUA)",
            "city": "Wu Hai",
            "country": "China",
            "iata": "WUA",
            "airport": ""
          },
          {
            "label": "Yakutat, US (YAK)",
            "city": "Yakutat",
            "country": "US",
            "iata": "YAK",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Yandina, Solomon Islands (XYA)",
            "city": "Yandina",
            "country": "Solomon Islands",
            "iata": "XYA",
            "airport": ""
          },
          {
            "label": "Zachar Bay, US (KZB)",
            "city": "Zachar Bay",
            "country": "US",
            "iata": "KZB",
            "airport": "",
            "currency_code": "USD"
          },
          {
            "label": "Dubai, UAE (XNB)",
            "city": "Dubai",
            "country": "UAE",
            "iata": "XNB",
            "airport": "Dubai Bus Station"
          },
          {
            "label": "Dubai, UAE (DWC)",
            "city": "Dubai",
            "country": "UAE",
            "iata": "DWC",
            "airport": "Al Maktoum International Airport"
          },
          {
            "label": "Dubai, UAE (ZVJ)",
            "city": "Dubai",
            "country": "UAE",
            "iata": "ZVJ",
            "airport": "Abu Dhabi Bus Station"
          },
          {
            "label": "Karachi, PK (KHI)",
            "city": "Karachi",
            "country": "Pakistan",
            "iata": "KHI",
            "airport": "Jinnah International Airport",
            "currency_code": "PKR"
          }
        ]
        mongoose.model('airportJSON', airportJSON).create(obj,
            (error, success) => {
                if (error)
                    console.log("Error is" + error)
                else
                    console.log("Static about_us content saved succesfully.", success);
            })
    }
});


