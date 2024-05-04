import './App.css'
import { useEffect, useState, useRef, useCallback } from 'react'
import './JobCard'
import PropsCard from './JobCard'
import SearchBar from './dropdown'

function App() {

    const getN = 30

    const [nlimit, setNlimit] = useState(getN)
    const [noffset, setNoffset] = useState(0)

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [index, setIndex] = useState(2)


    const [jobRoleValue, setjobRoleValue] = useState('')
    const [locationValue, setlocationValue] = useState('')
    const [expereinceValue, setExperienceValue] = useState(0)
    const [remoteValue, setRemoteValue] = useState('')
    const [minBaseValue, setMinBaseValue] = useState(0)

    const handleJobRole = (value) => {
        setjobRoleValue(value)
        
    }

    const handleRemoteValue = (value) => {
        setRemoteValue(value)
    }

    const handleLocation = (value) => {
        setlocationValue(value)
    }

    const handleExperience = (value) => {
        setExperienceValue(value)
    }

    const handleSalary = (value) => {
        setMinBaseValue(value)
    }

    const clearHandler = () => {
        setlocationValue('')
        setExperienceValue(0)
        setjobRoleValue('')
        setMinBaseValue(0)
        setRemoteValue('')
    }

    const fetchData = useCallback(async () => {
        if (isLoading) return

        setIsLoading(true)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                "limit": nlimit,
                "offset": noffset
                })
            } 
        setIsLoading(true)
        fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
            .then((response) => response.text())
            .then((result) => { setData((prevData) => [...prevData, ...JSON.parse(result)['jdList']])})
            .catch((error) => console.error(error))

        setNlimit(nlimit + getN)
        setNoffset(noffset + getN)
        setIndex((prevIndex) => prevIndex + 1)

        setIsLoading(false)  
    }, [index, isLoading])
 

    useEffect(() => {
        console.log('Inside useEffect')
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                "limit": nlimit,
                "offset": noffset
                })
            } 
        const getData = async () => {
            setIsLoading(true)
            fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
            .then((response) => response.text())
            .then((result) => { setData(JSON.parse(result)['jdList'])})
            .catch((error) => console.error(error))
        
            setNlimit(nlimit + getN)
            setNoffset(noffset + getN)
            setIsLoading(false)
        }
        getData()
    }, [])


        useEffect(() => {
            const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } =
                document.documentElement
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                fetchData()
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
  }, [fetchData])

    console.log(data.length, 'data', data, isLoading)

    const showAll = expereinceValue == 0 && locationValue == '' && jobRoleValue == '' && minBaseValue == 0 && remoteValue == ''

    var dataToShow = showAll ? 
        data : 
        data.filter(item => (jobRoleValue == '' || item.jobRole == jobRoleValue))
          .filter(item => locationValue == '' ||item.location == locationValue)
            .filter(item => expereinceValue == 0 || item.minExp >= expereinceValue)
            .filter(item => minBaseValue == 0 || item.minJdSalary >= minBaseValue)

    if (remoteValue.toLowerCase() == 'remote') {
        dataToShow = dataToShow.filter(item => item.location == 'remote')
    } else if (remoteValue.toLowerCase() != 'remote' && remoteValue != '') {
        dataToShow = dataToShow.filter(item => item.location != 'remote')
    }
    console.log(dataToShow.length, 'dataToshow length')

    if (data.length > 0) {
        var locationOptions = []
        var jobRoleOptions = []
        var locationLookup = {}
        var jobLookup = {}
        var experienceOptions = []
        for (let i = 0;i < 20;i++) {
            experienceOptions.push({'name': i + 1, 'value': i + 1})
        }
        var remoteOptions = [{'name': 'Remote', value: 'Remote'}, {'name': 'Onsite', value: 'Onsite'}]
        var minBasePayOptions = []
        for (let i = 9;i < 100;i+=5) {
            minBasePayOptions.push({'name': (i + 1) + 'LPA', 'value': i + 1}) 
        }
        for (let i = 0; i < data.length; i++) {
            var obj = {
                'name': data[i].location,
                'value': data[i].location 
            }
            if (!(data[i].location in locationLookup)){
                locationLookup[data[i].location] = 1
                locationOptions.push(obj)
            }

            var obj2 = {
                'name': data[i].jobRole,
                'value': data[i].jobRole
            }
            if (!(data[i].jobRole in jobLookup)) {
                jobLookup[data[i].jobRole] = 1
                jobRoleOptions.push(obj2)
            }

        }
        return (
            <div className='container'>
                <div className='search-css'>
                    <SearchBar options={locationOptions} setectedValue = {locationValue} name='Location' handler = {handleLocation}/>
                    <SearchBar options={jobRoleOptions} name='JobRole' selectedValue = {jobRoleValue} handler = {handleJobRole}/>
                    <SearchBar options={remoteOptions} name='Remote/Onsite'selectedValue = {remoteValue} handler= {handleRemoteValue}/>
                    <SearchBar options={experienceOptions} name='Experience' selectedValue = {expereinceValue} handler = {handleExperience} />
                    <SearchBar options={minBasePayOptions} name='MinBase' selectedValue = {minBaseValue} handler = {handleSalary}/>
                    <button onClick={clearHandler}>Clear</button>
                </div>
                <div className='App'>
                   {dataToShow.map(d => <PropsCard props={d} />)}  
                </div>
                <div >{isLoading && <p>Loading</p>} </div>
            </div>
        )
    } 
}

export default App