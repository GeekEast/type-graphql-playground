#!/bin/bash

#  to add a secondary instance
mongo <<< "
rs.initiate();
rs.add('mongodb-secondary:27017');
"

#  to delay the secondary instance synchronization for 10 seconds
mongo <<< "
cfg = rs.conf();
cfg.members[1].priority = 0;
cfg.members[1].hidden = true;
cfg.members[1].slaveDelay = 10;
rs.reconfig(cfg);
"

# wait for 5 seconds
sleep 5s