/routing ospf instance  
add disabled=no name=OSPFInst1 redistribute=connected router-id=10.0.0.1  
/routing ospf area  
add disabled=no instance=OSPFInst1 name=backbone  
/ip address  
add address=10.0.0.1/30 interface=ether1 network=10.0.0.0  
add address=10.0.0.6/30 interface=ether2 network=10.0.0.4  
add address=192.168.10.1/24 interface=ether5 network=192.168.10.0  
/routing ospf interface-template  
add area=backbone cost=15 disabled=no interfaces=ether1  
add area=backbone cost=15 disabled=no interfaces=ether2  
/system identity  
set name=R1

/routing ospf instance  
add disabled=no name=OSPFInst1 redistribute=connected router-id=10.0.0.2  
/routing ospf area  
add disabled=no instance=OSPFInst1 name=backbone  
/ip address  
add address=10.0.0.13/30 interface=ether1 network=10.0.0.12  
add address=10.0.0.2/30 interface=ether2 network=10.0.0.0  
add address=10.0.0.18/30 interface=ether3 network=10.0.0.16  
add address=192.168.20.1/24 interface=ether5 network=192.168.20.0  
/routing ospf interface-template  
add area=backbone cost=15 disabled=no interfaces=ether1  
add area=backbone cost=10 disabled=no interfaces=ether2  
add area=backbone cost=50 disabled=no interfaces=ether3  
/system identity  
set name=R2  

/routing ospf instance  
add disabled=no name=OSPFInst1 redistribute=connected router-id=10.0.0.5  
/routing ospf area  
add disabled=no instance=OSPFInst1 name=backbone  
/ip address  
add address=10.0.0.5/30 interface=ether1 network=10.0.0.4  
add address=10.0.0.9/30 interface=ether2 network=10.0.0.8  
add address=10.0.0.17/30 interface=ether3 network=10.0.0.16  
add address=192.168.30.1/24 interface=ether5 network=192.168.30.0  
/routing ospf interface-template  
add area=backbone cost=15 disabled=no interfaces=ether1  
add area=backbone cost=50 disabled=no interfaces=ether3  
add area=backbone cost=10 disabled=no interfaces=ether2  
/system identity  
set name=R3

/routing ospf instance  
add disabled=no name=OSPFInst1 redistribute=connected router-id=10.0.0.10  
/routing ospf area  
add disabled=no instance=OSPFInst1 name=backbone  
/ip address  
add address=10.0.0.10/30 interface=ether1 network=10.0.0.8  
add address=10.0.0.14/30 interface=ether2 network=10.0.0.12  
add address=192.168.30.1/24 interface=ether5 network=192.168.30.0  
/routing ospf interface-template  
add area=backbone cost=10 disabled=no interfaces=ether1  
add area=backbone cost=10 disabled=no interfaces=ether2  
/system identity  
set name=R4